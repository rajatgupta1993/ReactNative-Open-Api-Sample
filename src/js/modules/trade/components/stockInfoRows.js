import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Stylesheet from '../../../../styles/styleSheet';
import PropTypes from 'prop-types';

function showStockData(props) {
    const length = props.length;
    switch (length) {
        case '2': return stockInfoForTwoData(props);
            break;

        case '3': return stockInfoForThreeData(props);
            break;

        case '4': return stockInfoForFourData(props);
            break;

        default:

    }
}

function stockInfoForTwoData({ text, data1, data2 }) {
    return (
        <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', marginTop: 2 }]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>{data1}</Text>
                <Text style={[text ? Stylesheet.Text12BoldWhite : Stylesheet.searchInstrumentRowMinorText, { fontSize: 11 }]}>{data2}</Text>
            </View>
        </View>
    );

}
function stockInfoForThreeData(props) {
    const { data1, data2, data3, netChangeColor, style, margin } = props;

    return (<View style={[Stylesheet.searchInstrumentRow, {
        flexDirection: 'row', backgroundColor: '#000', borderWidth: 0, marginTop: margin ? -10 : 0,
    }]}
    >
        <View style={[Stylesheet.XCenter, Stylesheet.YCenter, Stylesheet.FlexOne, { alignItems: 'flex-start' }]}>
            <Text style={[Stylesheet.Text12BoldWhite, style ? Stylesheet.searchInstrumentRowMinorText : null]}>{data1}</Text>
        </View>

        <View style={[Stylesheet.XCenter, Stylesheet.YCenter, Stylesheet.FlexOne]}>
            <Text style={[Stylesheet.Text12BoldWhite, { color: netChangeColor ? props.netChangeColor : '#fff', alignSelf: 'center' },
                props.style ? Stylesheet.searchInstrumentRowMinorText : null]}
            >{data2}</Text>
        </View>

        <View style={[Stylesheet.XCenter, Stylesheet.YCenter, Stylesheet.FlexOne, { alignItems: 'flex-end' }]}>
            <Text style={[Stylesheet.Text12BoldWhite, style ? Stylesheet.searchInstrumentRowMinorText : null]}>{data3}</Text>
        </View>

    </View>);

}

function stockInfoForFourData(props) {
    const { data1, data2, data3, data4, text } = props;
    return (
        <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', paddingVertical: 4 }]}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.Text12BoldWhite}>{data1}</Text>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.Text12BoldWhite}>{data2}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.Text12BoldWhite}>{data3}</Text>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.Text12BoldWhite}>{data4}</Text>
            </View>

        </View>
    );
}

function stockInfoRows(props) {

    return (
        <View>
            {showStockData(props)}
        </View>
    );
}
stockInfoRows.propTypes = {
    data: PropTypes.array,
};

stockInfoForTwoData.propTypes = {
    text: PropTypes.bool,
    data1: PropTypes.string,
    data2: PropTypes.string,
};

stockInfoForThreeData.propTypes = {
    data1: PropTypes.string,
    data2: PropTypes.string,
    data3: PropTypes.string,
    netChangeColor: PropTypes.string,
    style: PropTypes.bool,
    margin: PropTypes.bool,
};

stockInfoForFourData.propTypes = {
    data1: PropTypes.string,
    data2: PropTypes.string,
    data3: PropTypes.string,
    data4: PropTypes.string,
    text: PropTypes.bool,
};

export default stockInfoRows;
