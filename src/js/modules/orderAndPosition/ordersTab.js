import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import _ from 'lodash';
import { object, bool, string, array } from 'prop-types';
import * as queries from './queries';
import Stylesheet from '../../../styles/styleSheet';
import { TRADE_TYPE } from '../../utils/constants';
import OrdersTabHeader from './components/ordersTabHeader';
import ActivityIndicator from '../../components/activityIndicator';

export default class OrdersTab extends Component {
    constructor(props) {
        super(props);
        this.state = { tradeUpdated: false };
        this.trades = {};
        this.posTrades = {};
        this.tradeSubscription = {};
        this.currentAccountInformation = this.props.currentAccountInformation;
        this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
        this.tradeTypeId = 'OrderId';
        this.positionDetails = {};
        this.posTradeSubscription = {};
        this.handleTradeUpdate = this.handleTradeUpdate.bind(this);
    }

    // this function is for fetching subscription on first load.
    componentDidMount() {
        this.createTradeSubscription();
    }

    // this is for handling account reselection.
    componentWillReceiveProps(newProps) {
        this.currentAccountInformation = newProps.currentAccountInformation;
        if (this.tradeAccountSubscribed !== this.currentAccountInformation.AccountId) {
            this.createTradeSubscription();
        }
    }

    // subscriptions need to be destroyed while navigating away from pages.
    componentWillUnmount() {
        this.disposeSubscription();
    }

    createTradeSubscription() {
        this.disposeSubscription();
        const queryKey = {
            accountKey: this.currentAccountInformation.AccountKey,
            clientKey: this.currentAccountInformation.ClientKey,
        };

        if (this.props.tradeType === TRADE_TYPE.ORDER || this.props.tradeType === TRADE_TYPE.NETPOSITION) {
            queries.createSubscription(
                this.props,
                {
                    accountKey: queryKey.accountKey,
                    clientKey: queryKey.clientKey,
                    fieldGroups: this.props.fieldGroups,
                },
                this.props.tradeType,
                this.handleTradeUpdate,
                (tradeSubscription) => {
                    this.tradeSubscription = tradeSubscription;
                    this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
                }
            );
        }
    }

    handleTradeUpdate(response) {
        this.trades = queries.getUpdatedTrades(this.trades, this.tradeTypeId, response.Data);
        this.setState({ tradeUpdated: !this.state.tradeUpdated });
    }

    disposeSubscription() {
        if (!_.isEmpty(this.tradeSubscription)) {
            queries.unSubscribe(this.props, this.tradeSubscription, () => {
                this.trades = {};
                this.tradeSubscription = {};
            });
        }
    }

    render() {
        return (

            <View style={[Stylesheet.FlexOne, { backgroundColor: '#444' }]} >

                <View style={{ backgroundColor: '#444' }}>

                    <OrdersTabHeader />

                    {(this.props.isLoading) && (<ActivityIndicator
                        animating
                        color="#1E90FF"
                        size="large"
                    />
                    )}

                    {!_.isEmpty(this.trades) &&
                    <ScrollView >

                        {_.map(this.trades, (value, key) => {
                            return (
                                value && <View key={key} style={Stylesheet.ordersTabRow}>
                                    <View style={{ flex: 6 }}>
                                        <Text style={Stylesheet.Text12BoldWhite}>{value.DisplayAndFormat.Description}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>
                                                {value.BuySell}
                                            </Text>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>
                                                {` - ${value.OpenOrderType}`}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 2 }}>
                                        <Text style={Stylesheet.Text12BoldWhite}>
                                            {value.Amount}
                                        </Text>
                                        <Text style={Stylesheet.searchInstrumentRowMinorText}>
                                            {value.Price ? value.Price : '-'}
                                        </Text>
                                    </View>

                                    <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 10 }}>
                                        <Text style={Stylesheet.Text12BoldWhite}>
                                            Stop
                                        </Text>
                                        <Text style={Stylesheet.searchInstrumentRowMinorText}>
                                            Limit
                                        </Text>
                                    </View>
                                </View>
                            );

                        })}
                    </ScrollView>}

                </View>

            </View>
        );
    }
}

OrdersTab.propTypes = {
    currentAccountInformation: object,
    isLoading: bool,
    fieldGroups: array,
    tradeType: string,
};

OrdersTab.defaultProps = {
    currentAccountInformation: {},
    isLoading: false,
    fieldGroups: [],
    tradeType: '',
};
