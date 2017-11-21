import React from 'react';
import { ActivityIndicator } from 'react-native';
import Stylesheet from '../../styles/styleSheet';
import PropTypes from 'prop-types';

export default function activityIndicator({ animating, color, size }) {

    return (
        <ActivityIndicator
            animating={animating}
            color={color}
            size={size}
            style={[Stylesheet.ActivityIndicator, Stylesheet.screenWidthHeight]}
        />
    );
}

activityIndicator.propTypes = {
    animating: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
};
