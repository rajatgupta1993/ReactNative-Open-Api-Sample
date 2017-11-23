import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Stylesheet from '../../../../styles/styleSheet';

export default function OrdersTabHeader() {
    return (
        <View style={Stylesheet.ordersTabRow}>
            <View style={{ flex: 6 }}>
                <Text style={Stylesheet.smallWhiteText}>Instrument</Text>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>Buy/Sell - Type</Text>
            </View>

            <View style={{ flex: 2 }}>
                <Text style={Stylesheet.smallWhiteText}>Amount</Text>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>Price</Text>
            </View>

            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 10 }}>
                <Text style={Stylesheet.smallWhiteText}>Stop</Text>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>Limit</Text>
            </View>
        </View>
    );
}
