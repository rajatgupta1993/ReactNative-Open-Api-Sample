import React from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';
import { bool } from 'prop-types';

class Loader extends React.PureComponent {
    render() {

        return (
            <View style={{ flex: 1 }} >

                <ActivityIndicator
                    animating={this.props.isLoading}
                    color="#bc2b78"
                    size="large"
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 80 }}
                />
            </View>
        );
    }
}

// Loader.propTypes = { isLoading: bool };

Loader.defaultProps = { isLoading: false };

export default Loader;
