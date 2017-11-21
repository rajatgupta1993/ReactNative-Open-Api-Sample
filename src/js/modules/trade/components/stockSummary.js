import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { Icon } from 'native-base';
import Stylesheet from '../../../../styles/styleSheet';
import { string, object } from 'prop-types';

export default function StockSummary({ DisplayAndFormat, assetType }) {
    return (
        <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', marginTop: 2 }]}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row',}}>
                    <Text style={[Stylesheet.Text12BoldWhite, { flex: 12 }]}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        maxLength={30}
                    >
                        {DisplayAndFormat.Description}
                    </Text>
                    <Text style={[Stylesheet.searchInstrumentRowMinorText, { flex: 2, paddingLeft: 20 }]}>
                        {assetType}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={Stylesheet.searchInstrumentRowMinorText}>
                        {DisplayAndFormat.Symbol}
                    </Text>
                    <Text style={Stylesheet.searchInstrumentRowMinorText}>
                        .
                    </Text>
                    <Text style={Stylesheet.searchInstrumentRowMinorText}>
                        {DisplayAndFormat.Currency}
                    </Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Icon name="md-search" style={{ fontSize: 18, color: '#fff' }}
                    onPress={() => this.props.navigation.goBack('')}
                />
            </View>
        </View>
    );
}

StockSummary.propTypes = {
    DisplayAndFormat: object,
    assetType: string,
};
