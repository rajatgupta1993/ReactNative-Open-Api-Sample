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
        case '2': return stockInfoForTwoColumns(props);

        case '3': return stockInfoForThreeColumns(props);

        case '4': return stockInfoForFourColumns(props);

        default:
            break;
    }
}

function stockInfoForTwoColumns({ text, firstColData, secondColData }) {
    return (
        <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', marginTop: 2 }]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>{firstColData}</Text>
                <Text style={[text ? Stylesheet.smallWhiteText : Stylesheet.searchInstrumentRowMinorText, { fontSize: 11 }]}>{secondColData}</Text>
            </View>
        </View>
    );

}
function stockInfoForThreeColumns(props) {
    const { firstColData, secondColData, thirdColData, netChangeColor, style, margin } = props;

    return (<View style={[Stylesheet.searchInstrumentRow, {
        flexDirection: 'row', backgroundColor: '#000', borderWidth: 0, marginTop: margin ? -10 : 0,
    }]}
    >
        <View style={[Stylesheet.XCenter, Stylesheet.YCenter, Stylesheet.FlexOne, { alignItems: 'flex-start' }]}>
            <Text style={[Stylesheet.smallWhiteText, style ? Stylesheet.searchInstrumentRowMinorText : null]}>{firstColData}</Text>
        </View>

        <View style={[Stylesheet.XCenter, Stylesheet.YCenter, Stylesheet.FlexOne]}>
            <Text style={[Stylesheet.smallWhiteText, { color: netChangeColor ? props.netChangeColor : '#fff', alignSelf: 'center' },
                props.style ? Stylesheet.searchInstrumentRowMinorText : null]}
            >{secondColData}</Text>
        </View>

        <View style={[Stylesheet.XCenter, Stylesheet.YCenter, Stylesheet.FlexOne, { alignItems: 'flex-end' }]}>
            <Text style={[Stylesheet.smallWhiteText, style ? Stylesheet.searchInstrumentRowMinorText : null]}>{thirdColData}</Text>
        </View>

    </View>);

}

function stockInfoForFourColumns(props) {
    const { firstColData, secondColData, thirdColData, fourthColData, text } = props;
    return (
        <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', paddingVertical: 4 }]}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.smallWhiteText}>{firstColData}</Text>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.smallWhiteText}>{secondColData}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.smallWhiteText}>{thirdColData}</Text>
                <Text style={text ? Stylesheet.searchInstrumentRowMinorText : Stylesheet.smallWhiteText}>{fourthColData}</Text>
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

stockInfoForTwoColumns.propTypes = {
    text: PropTypes.bool,
    firstColData: PropTypes.string,
    secondColData: PropTypes.string,
};

stockInfoForThreeColumns.propTypes = {
    firstColData: PropTypes.string,
    secondColData: PropTypes.string,
    thirdColData: PropTypes.string,
    netChangeColor: PropTypes.string,
    style: PropTypes.bool,
    margin: PropTypes.bool,
};

stockInfoForFourColumns.propTypes = {
    firstColData: PropTypes.string,
    secondColData: PropTypes.string,
    thirdColData: PropTypes.string,
    fourthColData: PropTypes.string,
    text: PropTypes.bool,
};

export default stockInfoRows;
