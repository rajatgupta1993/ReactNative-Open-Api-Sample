import React from 'react';
import {
    View,
    Button,
} from 'react-native';
import { object, func } from 'prop-types';
import Stylesheet from '../../../styles/styleSheet';

export default function Home(props) {
    return (

        <View style={[Stylesheet.FlexOne, Stylesheet.YCenter, Stylesheet.XCenter, {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#444',
        }]}
        >
            <Button style={{ paddingHorizontal: 5 }}
                title="Enter Access Token"
                color="#222"
                onPress={() => props.navigation.navigate('AddToken')}
            />
            <View style={{ height: 20 }} />
            <Button style={{ marginTop: 20, padding: 5 }}
                title="Orders"
                color="#222"
                onPress={() => props.navigation.navigate('Trade')}
            />
        </View>
    );
}

Home.propTypes = {
    navigation: object,
    navigate: func,
};


