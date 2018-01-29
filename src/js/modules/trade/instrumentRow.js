import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Stylesheet from '../../../styles/styleSheet';
import PropTypes from 'prop-types';

function instrumentRow(props) {

    const generateRow = (data, rowId) => {
        const assetType = (data.AssetType === 'CfdOnStock') ? 'CFD' : data.AssetType;
        const object = { instrument: data, ...props };
        return (
            <TouchableOpacity key={rowId} style={Stylesheet.searchInstrumentRow}
                onPress={() => props.navigation.navigate('TradeScreen', { ...object })}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={Stylesheet.smallWhiteText} >{data.Description}</Text>
                    <Text style={Stylesheet.searchInstrumentRowMinorText} >{assetType}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={Stylesheet.searchInstrumentRowMinorText} >{data.Symbol}</Text>
                    <Text style={Stylesheet.searchInstrumentRowMinorText} >{data.ExchangeName} </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }} >
            {generateRow(props.data, props.rowId)}
        </View>
    );
}
instrumentRow.propTypes = {
    data: PropTypes.object,
    rowId: PropTypes.number,
    navigation: PropTypes.object,
    navigate: PropTypes.func,

};

export default instrumentRow;
