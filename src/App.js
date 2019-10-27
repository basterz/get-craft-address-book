import React, {Component} from 'react';
import './App.css';
import {withTranslation} from 'react-i18next';
import NavBar from "./components/NavBar";

import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchAddressesIfNeeded} from "./redux/actions/actions";
import AddressList from "./components/AddressList/";


class App extends Component {
    componentDidMount() {
        const { dispatch, selectedApi } = this.props
        dispatch(fetchAddressesIfNeeded(selectedApi))
    }
    render() {
        return (
            <div className="App">
                <NavBar></NavBar>
                <AddressList></AddressList>
                {/*.*/}
            </div>
        );
    }
    state = {
        value: "en"
    };
}

App.propTypes = {
    selectedApi: PropTypes.string.isRequired,
    addresses: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { selectedApi, addressesByApi } = state;
    const { isFetching, lastUpdated, addresses } = addressesByApi[
        selectedApi
        ] || {
        isFetching: true,
        addresses: []
    };

    return {
        selectedApi,
        addresses,
        isFetching,
        lastUpdated
    }
}


export default connect(mapStateToProps)(withTranslation()(App))
