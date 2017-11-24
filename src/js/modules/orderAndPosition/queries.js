import { doWithLoader, doWithLoaderAll } from '../../utils/global';
import * as API from '../../utils/api';
import _ from 'lodash';

export function unSubscribe(props, subscription, cb) {
    doWithLoader(props, _.partial(API.removeIndividualSubscription, props.accessToken, subscription), () => cb());
}

export function createSubscription(props, subscriptionArgs, tradeType, onUpdate, cb) {
    doWithLoader(
        props,
        _.partial(API[`create${tradeType}Subscription`], props.accessToken, subscriptionArgs, onUpdate),
        (result) => cb(result)
    );
}

export function createSubscriptionAll(subscriptionArgsNetPosition, subscriptionArgsPosition, params, netPositionCb, positionCb) {
    doWithLoaderAll(
        params.props,
        _.partial(API[`create${params.netPositionTradeType}Subscription`], params.props.accessToken,
            subscriptionArgsNetPosition, params.netPositionTradeCallBack),
        _.partial(API[`create${params.positionTradeType}Subscription`], params.props.accessToken,
            subscriptionArgsPosition, params.positionCallBack),
        (result) => netPositionCb(result),
        (result) => positionCb(result)
    );
}

export function getUpdatedTrades(currTrades, tradeTypeId, updatedTrades) {
    _.forEach(updatedTrades, (value, index) => {
        const tradeId = updatedTrades[index][tradeTypeId];
        if (currTrades[tradeId]) {
            _.merge(currTrades[tradeId], updatedTrades[index]);
        } else {
            currTrades[tradeId] = updatedTrades[index];
        }
    });
    return currTrades;
}

export function getAccountArray(accountInfo) {
    return _.reduce(accountInfo.Data, (result, value) => {
        result.push(value);
        return result;
    }, []);
}

export function fetchAccountInfo(props, cb) {
    doWithLoader(props, _.partial(API.getAccountInfo, props.accessToken), (result) => cb(result.response));
}
