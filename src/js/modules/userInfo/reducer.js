import * as actionTypes from './actiontypes';
import _ from 'lodash';

const initialState = {
    accessToken: '',
    userData: {},
};

// const initialState = {
//     accessToken: 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkQ0QUU4MjQ2RDYyNTBFMTY5Njg4NDFCREY4Nzc2MTI4NUMwNUJCMUYifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiMTEwIiwidWlkIjoiWUtkYUxpdVlmdndrUi1KUGJNUjU5dz09IiwiY2lkIjoiWUtkYUxpdVlmdndrUi1KUGJNUjU5dz09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiI2Njk4OTQ4Y2VmNTc0MDZkOTRjNzYyMzBhNGI1OTFiMyIsImRnaSI6IjgyIiwiZXhwIjoiMTUxNjM1ODE1OSJ9.ohlga2QGkShKegQpsqzNvcqgTMrg10n6_fYcNIv54tSHkVRguqUDZCUacVcFkZpPccKzIuUq1C_O10wrl4_U-A',
//     userData: {
//         ClientKey: 'IyDF5bpbdE4aLKNle1SdBg==',
//         Culture: 'en-GB',
//         Language: 'en',
//         LastLoginStatus: 'Successful',
//         LastLoginTime: '2017-11-02T11:53:30.663000Z',
//         Name: 'vinay gosain',
//         TimeZoneId: 26,
//         UserId: '8248538',
//         UserKey: 'IyDF5bpbdE4aLKNle1SdBg==',
//         LegalAssetTypes: ['FxSpot', 'FxForwards', 'FxVanillaOption', 'FxKnockInOption', 'FxKnockOutOption', 'FxOneTouchOption', 'FxNoTouchOption', 'ContractFutures', 'FuturesStrategy', 'Stock', 'Bond', 'FuturesOption', 'StockIndexOption', 'StockOption', 'CfdOnStock', 'CfdOnIndex', 'CfdOnFutures', 'StockIndex'],

//     },
// };

function _updateUserInfo(state, data) {
    return _.defaults({ ...data }, state);
}

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_USER_INFO:
            return _updateUserInfo(state, action);

        default:
            return state;
    }
}
