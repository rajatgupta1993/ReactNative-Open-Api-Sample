import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Stylesheet from '../../../../styles/styleSheet';

export default function PositionsTabHeader() {
    return (
        <View style={Stylesheet.ordersTabRow}>
            <View style={{ flex: 6 }}>
                <Text style={Stylesheet.Text12BoldWhite}>Instrument</Text>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>Description</Text>
            </View>

            <View style={{ flex: 2 }}>
                <Text style={Stylesheet.Text12BoldWhite}>P/L</Text>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>P/L(EUR)</Text>
            </View>

            <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 10 }}>
                <Text style={Stylesheet.Text12BoldWhite}>Close Price</Text>
                <Text style={Stylesheet.searchInstrumentRowMinorText}>Open Price</Text>
            </View>
        </View>
    );
}
