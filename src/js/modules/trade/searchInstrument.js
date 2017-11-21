import React from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Container, Item, Input, Icon } from 'native-base';
import * as queries from './queries';
import { bool } from 'prop-types';
import Error from '../error';
import Stylesheet from '../../../styles/styleSheet';
import InstrumentRow from './instrumentRow';
import ActivityIndicator from '../../components/activityIndicator';

const { height } = Dimensions.get('window');

class searchInstrument extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            instrumentSearchResult: [],
        };
    }
    onSearchTextChange(text) {
        this.setState({ searchTerm: text });
        if (text.length <= 1) {
            this.setState({ instrumentSearchResult: [] });
        } else {
            queries.fetchInstrumentsByKeyword(text, this.props, (response) => {
                this.setState({
                    instrumentSearchResult: response.Data,
                });
            });
        }

    }

    render() {
        return (

            <Container style={{ flex: 1, backgroundColor: '#444' }}>
                <Error>
                    Enter correct access token
                </Error>
                <View style={{ backgroundColor: '#888', padding: 10 }}>
                    <Item style={{ backgroundColor: '#444', paddingHorizontal: 10 }}>
                        <Icon name="ios-search" style={{ color: '#fff' }} />
                        <Input placeholder="Search"
                            placeholderTextColor="#fff"
                            onChangeText={this.onSearchTextChange.bind(this)}
                            value={this.state.searchTerm}
                            style={{ color: '#fff', height: 40, marginTop: 2 }}
                        />
                        <Icon name="md-close" style={{ color: '#fff' }}
                            onPress={() => this.setState({ searchTerm: '', instrumentSearchResult: [] })}
                        />
                    </Item>
                </View>

                {(this.props.isLoading) && (
                    <ActivityIndicator
                        animating
                        color="#1E90FF"
                        size="large"
                    />)}
                <ScrollView style={{ flex: 1 }}>
                    {(this.state.instrumentSearchResult.length !== 0) ? (
                        <View style={{ flex: 1 }}>
                            <InstrumentRow
                                {...this.props}
                                data={this.state.instrumentSearchResult}
                            />
                        </View>) :
                        (<View style={Stylesheet.searchInstrumentDefaultView}>
                            <Icon name="md-search" style={{ color: '#fff' }} />
                            <Text style={{ fontSize: 16, fontFamily: 'roboto', color: '#fff' }}>
                                Find Instrument
                             </Text>
                        </View>)}
                </ScrollView>
            </Container>

        );
    }
}

export default searchInstrument;

searchInstrument.propTypes = {
    isLoading: bool,
};
