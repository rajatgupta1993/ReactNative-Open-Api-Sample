import React, { Component } from 'react';
import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import OrdersTab from './ordersTab';
import PositionTab from './positionTab';
import * as queries from './queries';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import { object } from 'prop-types';

export default class OrderAndPosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
        };
        this.tradeTypeId = 'OrderId';
        this.handleAccountSelect = this.handleAccountSelect.bind(this);
    }

    componentDidMount() {
        queries.fetchAccountInfo(this.props, (response) => {
            this.setState({ accounts: queries.getAccountArray(response) });
            this.handleAccountSelect(this.state.accounts[0]);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedAccount: nextProps.selectedAccount });
    }

    handleAccountSelect(account) {
        this.setState({ selectedAccount: account });
    }
    render() {

        const { accounts } = this.state;
        return (
            (accounts && accounts.length > 0) ? (<StyleProvider style={getTheme(material)}>
                <Container>
                    <Tabs initialPage={0}>
                        <Tab heading="Orders">
                            <OrdersTab {...this.props}
                                currentAccountInformation={accounts[0]}
                                tradeType="Order"
                                fieldGroups={['DisplayAndFormat', 'ExchangeInfo']}
                            />
                        </Tab>
                        <Tab heading="Positions">
                            <PositionTab {...this.props}
                                currentAccountInformation={accounts[0]}
                                tradeType="NetPosition"
                                fieldGroups={['NetPositionView',
                                    'NetPositionBase',
                                    'DisplayAndFormat',
                                    'ExchangeInfo',
                                    'SingleAndClosedPositionsBase',
                                    'SingleAndClosedPositionsView',
                                    'SingleAndClosedPositions',
                                ]}
                            />
                        </Tab>
                    </Tabs>
                </Container>
            </StyleProvider>) : null
        );
    }
}

OrderAndPosition.propTypes = {
    selectedAccount: object,
};
