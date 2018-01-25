import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Stylesheet from '../../../../styles/styleSheet';
import { object, string, number } from 'prop-types';

function columnWithThreeData(props) {
    const { data1, data2, data3, flexNumber, styleData } = props;

    return (
        <View style={[{ flex: flexNumber }, styleData]}>
            <Text style={Stylesheet.smallWhiteText}>{data1}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>
                    {data2}
                </Text>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>
                    {data3}
                </Text>
            </View>
        </View>
    );
}

function columnWithTwoData(props) {
    const { data1, data2, flexNumber, styleData } = props;
    let { firstTextColor, secondTextColor } = props;
    firstTextColor = firstTextColor ? firstTextColor : '#fff';
    secondTextColor = secondTextColor ? firstTextColor : '#AAA';
    return (
        <View style={[{ flex: flexNumber }, styleData]}>
            <Text style={[Stylesheet.smallWhiteText, { color: firstTextColor, fontWeight: '500' }]}>
                {data1}
            </Text>
            <Text style={[Stylesheet.searchInstrumentRowMinorText, { color: secondTextColor, fontWeight: '500' }]}>
                {data2}
            </Text>
        </View>
    );
}

export default function OrdersAndPositionTableColumn(props) {

    return (
        props.numberOfTextData === '3' ? columnWithThreeData(props) : columnWithTwoData(props)
    );
}

columnWithThreeData.propTypes = {
    data1: string,
    data2: string,
    data3: string,
    flexNumber: number,
    numberOfTextData: string,
    styleData: object,
};

columnWithTwoData.propTypes = {
    data1: string,
    data2: string,
    flexNumber: number,
    numberOfTextData: string,
    styleData: object,
    firstTextColor: string,
    secondTextColor: string,

};
