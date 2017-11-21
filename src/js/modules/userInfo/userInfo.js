import React from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
} from 'react-native';

import { object, string, func, bool } from 'prop-types';
import Error from '../error';
import Stylesheet from '../../../styles/styleSheet';
import DataTable from '../../components/dataTable';
import ActivityIndicator from '../../components/activityIndicator';

class UserInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { accessToken: props.accessToken };

        this.handleTokenChng = this.handleTokenChng.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleTokenChng(text) {
        this.setState({ accessToken: text });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.getUserDetails(this.state.accessToken);
    }

    render() {
        const { userData, isLoading } = this.props;
        return (
            <ScrollView style={[Stylesheet.FlexOne, Stylesheet.WhiteBg, { backgroundColor: '#444' }]}>
                <View style={[Stylesheet.AppPaddingX, Stylesheet.AppPaddingTop, Stylesheet.FlexOne]}>

                    <Error>
                        Please enter correct access token below.
                    </Error>
                    {(isLoading) ? (<ActivityIndicator
                        animating
                        color="#4c4cff"
                        size="large"
                    />) : (
                        <View style={[Stylesheet.BoxUnderline, { borderColor: '#111' }]}>
                            <Text style={Stylesheet.h3}>Set Access Token </Text>
                            <TextInput
                                style={{ height: 40, marginBottom: 20, marginTop: 10, color: '#fff' }}
                                multiline
                                selectTextOnFocus
                                placeholder="Paste authorization token here"
                                placeholderTextColor="#fff"
                                onChangeText={this.handleTokenChng}
                                value={this.state.accessToken}
                            />

                            <Button
                                title="Submit"
                                color="#222"
                                onPress={this.handleFormSubmit.bind(this)}
                            />
                        </View>)}

                    {(userData != null && userData.ClientKey != null) && (
                        <View style={[Stylesheet.BoxUnderline, { marginTop: 20, height: 400, borderColor: '#111' }]}>
                            <DataTable data={userData}/>
                        </View>)}

                </View>
            </ScrollView>

        );
    }
}

UserInfo.propTypes = {
    accessToken: string,
    userData: object,
    getUserDetails: func.isRequired,
    isLoading: bool,
};

export default UserInfo;
