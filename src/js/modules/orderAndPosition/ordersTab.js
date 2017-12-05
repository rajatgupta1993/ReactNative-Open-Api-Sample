import React from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import _ from 'lodash';
import Stylesheet from '../../../styles/styleSheet';
import OrdersTabHeader from './components/ordersTabHeader';
import ActivityIndicator from '../../components/activityIndicator';
import PropTypes from 'prop-types';
import OrdersAndPositionTableColumn from './components/ordersAndPositionTableColumn';

export default function OrdersTab(props) {
    return (
        <View style={{ backgroundColor: '#444' }}>

            <OrdersTabHeader />

            {(props.isLoading) && (<ActivityIndicator
                animating
                color="#1E90FF"
                size="large"
            />
            )}

            {!_.isEmpty(props.trades) &&
            <ScrollView >

                {_.map(props.trades, (value, key) => {
                    return (
                        value && <View key={key} style={Stylesheet.ordersTabRow}>
                            <OrdersAndPositionTableColumn
                                data1={value.DisplayAndFormat.Description}
                                data2={value.BuySell}
                                data3={` - ${value.OpenOrderType}`}
                                numberOfTextData="3"
                                flexNumber={6}
                            />

                            <OrdersAndPositionTableColumn
                                data1={value.Amount}
                                data2={value.Price ? value.Price : '-'}
                                numberOfTextData="2"
                                flexNumber={2}
                            />

                            <OrdersAndPositionTableColumn
                                data1="Stop"
                                data2="Limit"
                                numberOfTextData="2"
                                flexNumber={2}
                                styleData={{ flex: 2, alignItems: 'flex-end', paddingRight: 10 }}
                            />

                        </View>
                    );

                })}
            </ScrollView>}

        </View>
    );
}

OrdersTab.propTypes = {
    isLoading: PropTypes.bool,
    trades: PropTypes.object,
};

OrdersTab.defaultProps = {
    isLoading: false,
    trades: {},
};

