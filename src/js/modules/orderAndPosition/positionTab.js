import React from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import { roundUptoNDecimals } from '../../utils/global';
import Stylesheet from '../../../styles/styleSheet';
import _ from 'lodash';
import PositionsTabHeader from './components/positionsTabHeader';
import ActivityIndicator from '../../components/activityIndicator';
import PropTypes from 'prop-types';
import OrdersAndPositionTableColumn from './components/ordersAndPositionTableColumn';

export default function PositionTab(props) {

// const totalCost = positionDetailPL.TotalCost;
//         const totalCostInBaseCurrency = positionDetailPL.TotalCostInBaseCurrency;
//         const conversionProfitLoss = positionDetailPL.ProfitLossCurrencyConversion || 0;

//         const tradeProfitLoss = positionDetailPL.TradeProfitLoss || 0;
//         const tradeProfitLossBaseCurrency = positionDetailPL.TradeProfitLossBaseCurrency || 0;
//         const totalProfitLoss = tradeProfitLoss + totalCost;
//         const totalProfitLossBaseCurrency = tradeProfitLossBaseCurrency + totalCostInBaseCurrency + conversionProfitLoss;

    console.log(props);
    return (
        <View style={{ backgroundColor: '#444' }}>
            <PositionsTabHeader />
            {(props.isLoading) && (<ActivityIndicator
                animating
                color="#1E90FF"
                size="large"
            />
            )}
            {!_.isEmpty(props.trades) &&
                <ScrollView>
                    {_.map(props.trades, (value, key) => {
                        const firstTextColor = (value.NetPositionView.ProfitLossOnTrade + value.NetPositionView.TradeCostsTotal > 0 ? 'green' : '#e90101');
                        const secondTextColor = (value.NetPositionView.ProfitLossOnTradeInBaseCurrency + value.NetPositionView.TradeCostsTotalInBaseCurrency > 0 ? 'green' : '#e90101');
                        return (
                            value && <View key={key} style={Stylesheet.ordersTabRow}>
                                <OrdersAndPositionTableColumn data1={value.DisplayAndFormat.Description}
                                    data2={value.NetPositionBase.Amount}
                                    data3={` ${value.NetPositionView.Status}`}
                                    numberOfTextData="3"
                                    flexNumber={6}
                                />

                                <OrdersAndPositionTableColumn
                                    data1={
                                        !isNaN(value.NetPositionView.ProfitLossOnTrade +
                                            value.NetPositionView.TradeCostsTotal) ?
                                            `${roundUptoNDecimals(value.NetPositionView.ProfitLossOnTrade + value.NetPositionView.TradeCostsTotal, 0)} ${value.DisplayAndFormat.Currency}`
                                            : ''
                                    }
                                    data2={
                                        !isNaN(value.NetPositionView.ProfitLossOnTradeInBaseCurrency +
                                            value.NetPositionView.TradeCostsTotalInBaseCurrency)
                                            ? roundUptoNDecimals(value.NetPositionView.ProfitLossOnTradeInBaseCurrency +
                                                value.NetPositionView.TradeCostsTotalInBaseCurrency, 0)
                                            : ''
                                    }
                                    numberOfTextData="2"
                                    flexNumber={2}
                                    firstTextColor={firstTextColor}
                                    secondTextColor={secondTextColor}
                                />

                                { /* <View style={{ flex: 2, alignItems: 'center', paddingRight: 10 }}>
                                    {value.SingleAndClosedPositions ? (value.SingleAndClosedPositions[0].PositionBase.Amount > 0 ?
                                        <OrdersAndPositionTableColumn
                                            data1={
                                                value.SingleAndClosedPositions[0].PositionView ?
                                                    value.SingleAndClosedPositions[0].PositionView.CurrentPrice : ''
                                            }
                                            data2={
                                                value.SingleAndClosedPositions[0].PositionBase ?
                                                    value.SingleAndClosedPositions[0].PositionBase.OpenPrice : ''
                                            }
                                            numberOfTextData="2"
                                            flexNumber={1}
                                        /> :
                                        value.SingleAndClosedPositions[1] &&
                                        <OrdersAndPositionTableColumn
                                            data1={
                                                value.SingleAndClosedPositions[1].PositionView ?
                                                    value.SingleAndClosedPositions[1].PositionView.CurrentPrice : ''
                                            }
                                            data2={
                                                value.SingleAndClosedPositions[1].PositionBase ?
                                                    value.SingleAndClosedPositions[1].PositionBase.OpenPrice : ''
                                            }
                                            numberOfTextData="2"
                                            flexNumber={1}
                                        />
                                    ) :
                                        <OrdersAndPositionTableColumn
                                            data1={value.NetPositionView.CurrentPrice}
                                            data2={value.NetPositionView.AverageOpenPrice}
                                            numberOfTextData="2"
                                            flexNumber={1}
                                        />
                                    }
                                </View> */ }

                                <View style={{ flex: 2, alignItems: 'center', paddingRight: 10 }}>
                                    <OrdersAndPositionTableColumn
                                        data1={value.NetPositionView.CurrentPrice}
                                        data2={value.NetPositionView.AverageOpenPrice}
                                        numberOfTextData="2"
                                        flexNumber={1}
                                    />
                                </View>
                            </View>
                        );

                    })}
                </ScrollView>}

        </View>
    );
}

PositionTab.propTypes = {
    isLoading: PropTypes.bool,
    trades: PropTypes.object,
};

PositionTab.defaultProps = {
    isLoading: false,
    trades: {},
};
