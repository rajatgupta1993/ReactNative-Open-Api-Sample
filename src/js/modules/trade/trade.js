import React from 'react';
import { Text, View, Alert, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { Root, Button } from 'native-base';
import * as queries from './queries';
import { object, func, bool } from 'prop-types';
import Error from '../error';
import Dropdown from '../../components/dropdown';
import UserInputs from './components/userInputs';
import StockInfoRows from './components/stockInfoRows';
import { checkIfOption, roundUptoNDecimals } from '../../utils/global';
import Stylesheet from '../../../styles/styleSheet';
import ActivityIndicator from '../../components/activityIndicator';
import StockSummary from './components/stockSummary';

const orderDuration = ['DayOrder', 'GoodTillCancel', 'ImmediateOrCancel'];
const { deviceWidth, deviceHeight } = Dimensions.get('window');

class Orders extends React.PureComponent {
    constructor(props) {
        super(props);
        this.actionSheet = null;
        this.currentOrder = {
            // default values on UI.
            Uic: '',
            AssetType: '',
            OrderType: 'Market',
            OrderPrice: 0.0,
            OrderDuration: { DurationType: 'DayOrder' },
            Amount: 0,
            AccountKey: '',
            BuySell: 'Buy',

            /* possible order relations
               IfDoneMaster   -   If Done Orders is a combination of an entry order and conditional orders
                                  If the order is filled, then a (slave) stop loss, limit or trailing stop
                                  will automatically be attached to the new open position
               IfDoneSlave    -   If Done Orders is a combination of an entry order and conditional orders
                                  If the order is filled, then a (slave) stop loss, limit or trailing stop
                                  will automatically be attached to the new open position
               IfDoneSlaveOco -   Slave order with OCO. See OCO.
               Oco            -   One-Cancels-the-Other Order (OCO). A pair of orders stipulating that if
                                    one order is executed, then the other order is automatically canceled
               StandAlone     -   No relation to other order
            */
            OrderRelation: 'StandAlone',
            ToOpenClose: 'ToOpen',
            Orders: [],

            // currently sample works for StandAlone orders only. Work to be done for other OrderRelations
        };
        this.takeProfitPrice = 0.0;
        this.stopLossPrice = 0.0;
        this.stopLossOrderType = 'StopLimit';

        this.state = {
            updated: false,
            responseData: {},
            selectedOptionSpace: null,
            selectedAccount: null,
            accounts: [],
            instrumentInfo: null,
            supportedOrderTypes: [],
            takeProfitOpen: false,
            stopLossOpen: false,
            optionRoot: null,
        };

        this.handleInstrumentSelection = this.handleInstrumentSelection.bind(this);
        this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
        this.handleAssetTypeChange = this.handleAssetTypeChange.bind(this);
        this.handleOptionRoot = this.handleOptionRoot.bind(this);
        this.handleAccountSelect = this.handleAccountSelect.bind(this);
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
        const { instrument } = this.props;
        queries.fetchAccountInfo(this.props, (response) => {
            this.setState({ accounts: queries.getAccountArray(response) });
            this.handleAccountSelect(this.state.accounts[0]);
        });
        this.handleInstrumentSelection(instrument);
    }

    handleInstrumentSelection(instrument) {
        /* checkIfOption
           true  : simply update state to render option component.
           false : get instrument details.
        */

        if (checkIfOption(instrument.AssetType)) {
            this.handleOptionRoot(instrument);
        } else {
            queries.fetchInstrumentDetails(instrument, this.props, (response) => {
                this.handleInstrumentChange(response);
            });
        }
    }

    handleInstrumentChange(instrument) {
        queries.fetchInfoPrices(instrument, this.props, (response) => {
            this.currentOrder.Amount = response.Quote.Amount;
            this.currentOrder.Uic = response.Uic;
            this.currentOrder.AssetType = response.AssetType;
            this.currentOrder.OrderPrice = response.Quote.Ask ? response.Quote.Ask : 0.0;
            this.currentOrder.OrderType = instrument.SupportedOrderTypes[0];
            this.setState({
                supportedOrderTypes: instrument.SupportedOrderTypes,
                instrumentInfo: response,
            });
        });
    }

    handleAssetTypeChange(assetType) {
        if (!checkIfOption(assetType)) {
            this.setState({ optionRoot: null });
        }
    }

    handleOptionRoot(optionRoot) {
        this.setState({ optionRoot });
    }

    handleAccountSelect(account) {
        this.currentOrder.AccountKey = account.AccountKey;
        this.setState({ selectedAccount: account });
    }

    handleValueChange(event) {
        const updatedValues = queries.getUpdatedValues(event, {
            currentOrder: this.currentOrder,
            takeProfitPrice: this.takeProfitPrice,
            stopLossPrice: this.stopLossPrice,
            stopLossOrderType: this.stopLossOrderType,
        }, this.Ask, this.Bid);
        this.currentOrder = updatedValues.currentOrder;
        this.takeProfitPrice = updatedValues.takeProfitPrice;
        this.stopLossPrice = updatedValues.stopLossPrice;
        this.stopLossOrderType = updatedValues.stopLossOrderType;
        this.setModalVisible = this.setModalVisible.bind(this);
        this.setState({ updated: !this.state.updated });
    }

    handleProfitBtnClick() {
        this.setState({ takeProfitOpen: !this.state.takeProfitOpen });
    }

    handleLossBtnClick() {
        this.setState({ stopLossOpen: !this.state.stopLossOpen });
    }

    handlePlaceOrder(BuySell) {
        this.currentOrder.Orders = [];
        this.currentOrder.BuySell = BuySell;

        const obj = { selectedAccount: this.state.selectedAccount, ...this.props };
        if (this.state.takeProfitOpen) {
            // Setup related order
            const order = queries.getRelatedOrder('Limit', this.takeProfitPrice, this.currentOrder);
            this.currentOrder.Orders.push(order);
        }
        if (this.state.stopLossOpen) {
            // Setup another related order
            const order = queries.getRelatedOrder(this.stopLossOrderType, this.stopLossPrice, this.currentOrder);
            order.StopLimitPrice = this.stopLossPrice;
            this.currentOrder.Orders.push(order);
        }
        queries.postOrder(this.currentOrder, this.props, (response) => {
            this.setState({ responseData: response });
            ToastAndroid.show('Order placed !! ', ToastAndroid.SHORT);
            this.props.navigation.navigate('OrderAndPosition', { ...obj });
        });
    }

    handleOrderDurationChange(buttonIndex) {
        this.currentOrder.OrderDuration.DurationType = orderDuration[buttonIndex];
        this.setState({
            updated: !this.state.updated,
        });
    }

    handleOrderTypeChange(buttonIndex) {
        this.currentOrder.OrderType = this.state.supportedOrderTypes[buttonIndex];
        this.setState({ updated: !this.state.updated });
    }

    handleOrderPriceChange(text) {
        this.currentOrder.OrderPrice = text;
        this.setState({ updated: !this.state.updated });
    }

    handleOrderQuantityChange(text) {
        this.currentOrder.Amount = text;
        this.setState({ updated: !this.state.updated });
    }

    showAlert(BuySell) {
        Alert.alert(
            'ORDER CONFIRMATION',
            'Do you want to place your order? ',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => this.handlePlaceOrder(BuySell) },
            ],
        );
    }

    render() {
        const { instrument, isLoading } = this.props;
        const assetType = (instrument && instrument.AssetType === 'CfdOnStock') ? 'CFD' : instrument.AssetType;
        const DisplayAndFormat = this.state.instrumentInfo ? this.state.instrumentInfo.DisplayAndFormat : null;
        const PriceInfo = this.state.instrumentInfo ? this.state.instrumentInfo.PriceInfo : null;
        const PriceInfoDetails = this.state.instrumentInfo ? this.state.instrumentInfo.PriceInfoDetails : null;
        const InstrumentPriceDetails = this.state.instrumentInfo ? this.state.instrumentInfo.InstrumentPriceDetails : null;
        const Quote = this.state.instrumentInfo ? this.state.instrumentInfo.Quote : null;
        const marketStatus = (InstrumentPriceDetails && InstrumentPriceDetails.IsMarketOpen) ? 'Market Open' : 'Market Closed';
        const netChangeColor = (PriceInfo && PriceInfo.NetChange > 0) ? 'green' : 'red';
        const accountTitle = this.state.selectedAccount ? this.state.selectedAccount.AccountId : 'Select Account';
        return (
            <ScrollView style={{ flex: 1, height: deviceHeight, width: deviceWidth, backgroundColor: '#444' }}>
                <View style={[Stylesheet.FlexOne, Stylesheet.AppPaddingX, Stylesheet.AppPaddingTop, Stylesheet.screenWidthHeight]}>
                    <Root>
                        <Error>
                            Enter correct access token
                        </Error>
                        {(isLoading) && (<View style={{ width: deviceWidth, height: deviceHeight, flex: 1 }}><ActivityIndicator
                            animating
                            color="#1E90FF"
                            size="large"
                        />
                        </View>)}

                        {/* select account dropdown*/}
                        <View style={[Stylesheet.BoxUnderline, Stylesheet.XCenter, Stylesheet.YCenter, Stylesheet.textNDropdown]}>
                            <Text style={[Stylesheet.Text12BoldWhite, { flex: 1 }]}>
                                Select Account
                            </Text>
                            <Dropdown
                                promptHeading={accountTitle}
                                handleSelect={this.handleAccountSelect.bind(this)}
                                data={this.state.accounts}
                                itemKey="AccountId"
                                value="AccountId"
                                id="accounts"
                            />
                        </View>

                        {/* 1st row , Share name and market*/}
                        {(DisplayAndFormat) &&
                            <StockSummary DisplayAndFormat={DisplayAndFormat}
                                assetType={assetType}
                            />}

                        {/* Last Traded , Today's change Low/High*/}
                        {(PriceInfo && PriceInfoDetails) && <View style={{ marginTop: 2 }}>
                            <StockInfoRows length="3"
                                data1={PriceInfoDetails.LastTraded}
                                data2={`${roundUptoNDecimals(PriceInfo.NetChange, DisplayAndFormat.Decimals)}/${PriceInfo.PercentChange}%`}
                                data3={`${PriceInfo.Low}/${PriceInfo.High}`}
                                netChangeColor={netChangeColor}
                            />
                            <StockInfoRows length="3"
                                data1=" Last Traded"
                                data2="Today's change"
                                data3="Low / High"
                                style
                                margin
                            />
                        </View>}

                        {/* Market Status */}
                        {(InstrumentPriceDetails) && <StockInfoRows length="2"
                            data1={marketStatus}
                            data2={this.state.instrumentInfo.PriceSource}
                            text
                        />}

                        {/* Bid & Ask size*/}

                        {(Quote && PriceInfoDetails) && <View style={{ marginTop: 2 }}>
                            <StockInfoRows length="4"
                                data1="Size"
                                data2="Bid"
                                data3="Ask"
                                data4="Size"
                                text
                            />

                            <StockInfoRows length="4"
                                data1={PriceInfoDetails.BidSize}
                                data2={roundUptoNDecimals(Quote.Bid, DisplayAndFormat.Decimals)}
                                data3={roundUptoNDecimals(Quote.Ask, DisplayAndFormat.Decimals)}
                                data4={PriceInfoDetails.AskSize}
                                text={false}
                            />
                        </View>
                        }

                        {/* Duration And price */}
                        {(PriceInfoDetails) && <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <UserInputs
                                label="DURATION"
                                onChange={this.handleOrderDurationChange.bind(this)}
                                options={orderDuration}
                                componentClass="select"
                                value={this.currentOrder.OrderDuration.DurationType}
                                heading="Select Order Duration"
                            />

                            <View style={{ width: 10 }} />

                            <UserInputs
                                label="PRICE"
                                onChange={this.handleOrderPriceChange.bind(this)}
                                componentClass="text"
                                value={this.currentOrder.OrderPrice.toString()}
                                placeholder="enter price"
                            />
                        </View>}

                        {/* Type & Quantity*/}
                        {(this.state.supportedOrderTypes.length !== 0) &&
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <UserInputs options={this.state.supportedOrderTypes}
                                    label="TYPE"
                                    onChange={this.handleOrderTypeChange.bind(this)}
                                    currentOrder={this.currentOrder}
                                    componentClass="select"
                                    value={this.currentOrder.OrderType}
                                    heading="Select Order Type"
                                />

                                <View style={{ width: 10 }} />

                                <UserInputs
                                    label="QUANTITY"
                                    onChange={this.handleOrderQuantityChange.bind(this)}
                                    componentClass="text"
                                    value={this.currentOrder.Amount.toString()}
                                    placeholder="Enter Quantity"
                                />
                            </View>}

                        {/* BUY & SELL BUTTON*/}
                        <View style={{ width: deviceWidth, height: 30, flexDirection: 'row', marginTop: 10 }}>

                            <Button block light
                                style={Stylesheet.sellButton}
                                onPress={() => this.showAlert('sell')}
                            >
                                <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12, fontWeight: '700' }]}>
                                    SELL
                                </Text>
                            </Button>
                            <Button block light
                                style={[Stylesheet.sellButton, { backgroundColor: '#1E90FF' }]}
                                onPress={() => this.showAlert('buy')}
                            >
                                <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12, fontWeight: '700' }]} >
                                    BUY
                                </Text>
                            </Button>

                        </View>
                    </Root>
                </View>
            </ScrollView >
        );
    }
}

Orders.propTypes = {
    match: object,
    instrument: object,
    navigation: object,
    navigate: func,
    isLoading: bool,
};

Orders.defaultProps = { match: {} };

export default Orders;
