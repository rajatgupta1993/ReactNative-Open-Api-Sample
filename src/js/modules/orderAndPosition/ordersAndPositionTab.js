import React, { Component } from 'react';
import { View } from 'react-native';
import { object, string, bool, array } from 'prop-types';
import Stylesheet from '../../../styles/styleSheet';
import { TRADE_TYPE } from '../../utils/constants';
import * as queries from './queries';
import _ from 'lodash';
import OrdersTab from './ordersTab';
import PositionTab from './positionTab';

export default class OrdersAndPositionTab extends Component {
    constructor(props) {
        super(props);
        this.state = { tradeUpdated: false };
        this.trades = {};
        this.posTrades = {};
        this.tradeSubscription = {};
        this.currentAccountInformation = this.props.currentAccountInformation;
        this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
        this.tradeTypeId = `${this.props.tradeType}Id`;
        this.positionDetails = {};
        this.posTradeSubscription = {};
        this.handleTradeUpdate = this.handleTradeUpdate.bind(this);
        this.handlePositionTradeUpdate = this.handlePositionTradeUpdate.bind(this);
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
        if (this.props.tradeType === TRADE_TYPE.NETPOSITION) {
            const params = {
                'props': this.props,
                'netPositionTradeType': this.props.tradeType,
                'positionTradeType': TRADE_TYPE.POSITION,
                'netPositionTradeCallBack': this.handleTradeUpdate,
                'positionCallBack': this.handlePositionTradeUpdate,
            };
            queries.createSubscriptionAll(
                {
                    accountKey: queryKey.accountKey,
                    clientKey: queryKey.clientKey,
                    fieldGroups: this.props.fieldGroups,
                },
                {
                    accountKey: queryKey.accountKey,
                    clientKey: queryKey.clientKey,
                    fieldGroups: ['DisplayAndFormat', 'PositionBase', 'PositionView'],
                },
                params,
                (tradeSubscription) => {
                    this.tradeSubscription = tradeSubscription;
                    this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
                },
                (posTradeSubscription) => {
                    this.posTradeSubscription = posTradeSubscription;
                }
            );
        }
    }

    handleTradeUpdate(response) {

        this.trades = queries.getUpdatedTrades(this.trades, this.tradeTypeId, response.Data);
        this.setState({ tradeUpdated: !this.state.tradeUpdated });
    }

    handlePositionTradeUpdate(response) {
        this.posTrades = queries.getUpdatedTrades(this.posTrades, 'PositionId', response.Data);
        if (!_.isEmpty(this.posTrades)) {
            this.positionDetails = _.reduce(this.trades, (result, value) => {
                const NetPositionId = value.NetPositionId;
                const positions = [];
                const positionData = _.map(this.posTrades, (valuePostTrades) => {
                    if (NetPositionId === valuePostTrades.NetPositionId) {
                        positions.push(valuePostTrades);
                    }
                    return positionData;
                });
                result[NetPositionId] = positions;
                return result;
            }, {});
        }
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
                {this.props.tradeType === 'Order' ?
                    (<OrdersTab {...this.props} trades={this.trades} />) :
                    (<PositionTab {...this.props} trades={this.trades} />)
                }
            </View>
        );
    }

}

OrdersAndPositionTab.propTypes = {
    currentAccountInformation: object,
    isLoading: bool,
    fieldGroups: array,
    tradeType: string,
};

OrdersAndPositionTab.defaultProps = {
    currentAccountInformation: {},
    isLoading: false,
    fieldGroups: [],
    tradeType: '',
};
