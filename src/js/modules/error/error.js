import React from 'react';
import { View, Text } from 'react-native';
import { bool, func, string } from 'prop-types';
import Stylesheet from '../../../styles/styleSheet';

class Error extends React.PureComponent {
    constructor(props) {
        super(props);
        props.hideError();
    }

    render() {
        // const errorClass = classNames({ 'hide': !this.props.showError });
        return (
            <View >
                { (this.props.showError) && (
                    <Text style={[Stylesheet.error, { color: 'red', fontSize: 16, marginBottom: 5 }]} >
                        { this.props.errMessage || this.props.children }
                    </Text>)}
            </View>
        );
    }
}

Error.propTypes = {
    showError: bool,
    hideError: func.isRequired,
    errMessage: string,
};

Error.defaultProps = { showError: false };

export default Error;
