import React from 'react';
import { View } from 'react-native';
import Stylesheet from './src/styles/styleSheet';
import AppNavigator from './src/js/modules/app/rootNavigator';

export default function App() {
    return (
        <View style={[Stylesheet.FlexOne]} >
            <AppNavigator />
        </View>
    );
}
