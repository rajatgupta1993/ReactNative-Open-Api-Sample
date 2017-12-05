import React from 'react';
import {
    ActivityIndicator,
    View,
} from 'react-native';
import Stylesheet from '../../styles/styleSheet';
import PropTypes from 'prop-types';

export default function activityIndicator({ animating, color, size }) {
    return (
        <View style={[Stylesheet.ActivityIndicator, Stylesheet.screenWidthHeight]}>
            <ActivityIndicator
                animating={animating}
                color={color}
                size={size}
            />
        </View>
    );
}

activityIndicator.propTypes = {
    animating: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
};
