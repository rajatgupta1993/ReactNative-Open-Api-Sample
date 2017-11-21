import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { ActionSheet, Root } from 'native-base';
import Stylesheet from '../../../../styles/styleSheet';
import PropTypes from 'prop-types';

function getSelectCtrl(props) {
    const { label, options, heading, onChange, value } = props;
    return (<Root>
        <View style={{ backgroundColor: '#888', flex: 1 }} id={label}>
            <TouchableOpacity
                onPress={() =>
                    ActionSheet.show(
                        {
                            options,
                            title: heading,
                        },
                        (buttonIndex) => onChange(buttonIndex)
                    )}
            >
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={Stylesheet.Text12BoldBlack}>{label} </Text>
                    <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12 }]}>{value} </Text>
                </View>
            </TouchableOpacity>
        </View>
    </Root>);
}

function getTextCtrl({ label, placeholder, onChange, value }) {

    return (
        <View style={{ backgroundColor: '#888', flex: 1 }} >
            <Text style={Stylesheet.Text12BoldBlack}> {label} </Text>
            <TextInput placeholder={placeholder}
                keyboardType="numeric"
                placeholderTextColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={(text) => onChange(text)}
                value={value}
                style={{ color: '#fff', fontFamily: 'roboto', fontWeight: '600', height: 35, marginTop: -10, fontSize: 12 }}
            />
        </View>
    );
}

function userInput(props) {
    return (
        <View style={{ flex: 1, height: 40, backgroundColor: '#76545600' }} >
            {props.componentClass === 'select' ? getSelectCtrl(props) : getTextCtrl(props)}
        </View>
    );
}

export default userInput;

userInput.propTypes = {
    componentClass: PropTypes.string,
};

getSelectCtrl.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    heading: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

getTextCtrl.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};
