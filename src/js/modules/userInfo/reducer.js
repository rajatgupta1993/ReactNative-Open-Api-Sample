import * as actionTypes from './actiontypes';
import _ from 'lodash';

// const initialState = {
//     accessToken: '',
//     userData: {},
// };

const initialState = {
    accessToken: 'eyJhbGciOiJFUzI1NiIsIng1dCI6IkQ0QUU4MjQ2RDYyNTBFMTY5Njg4NDFCREY4Nzc2MTI4NUMwNUJCMUYifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiMTEwIiwidWlkIjoiWUtkYUxpdVlmdndrUi1KUGJNUjU5dz09IiwiY2lkIjoiWUtkYUxpdVlmdndrUi1KUGJNUjU5dz09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiJlODMxNzFhZmEyMGY0NzAyYTI3NTRmMjA2Nzg2MDc0ZSIsImRnaSI6IjgyIiwiZXhwIjoiMTUxNTc0Nzc1MSJ9.DVRbhjlkOjburTtB9Sa9VhcDOanIlThl6GSbT-DTxdWDAVXdIel60s7ogmN1BKHVLymFDopIx8IVlpy5xk6Rqw',
    userData: {
        ClientKey: 'IyDF5bpbdE4aLKNle1SdBg==',
        Culture: 'en-GB',
        Language: 'en',
        LastLoginStatus: 'Successful',
        LastLoginTime: '2017-11-02T11:53:30.663000Z',
        Name: 'vinay gosain',
        TimeZoneId: 26,
        UserId: '8248538',
        UserKey: 'IyDF5bpbdE4aLKNle1SdBg==',
        LegalAssetTypes: ['FxSpot', 'FxForwards', 'FxVanillaOption', 'FxKnockInOption', 'FxKnockOutOption', 'FxOneTouchOption', 'FxNoTouchOption', 'ContractFutures', 'FuturesStrategy', 'Stock', 'Bond', 'FuturesOption', 'StockIndexOption', 'StockOption', 'CfdOnStock', 'CfdOnIndex', 'CfdOnFutures', 'StockIndex'],

    },
};

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
