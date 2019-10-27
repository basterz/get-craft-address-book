import React, {Component} from 'react';
import './App.css';
import {withTranslation} from 'react-i18next';
import {i18n} from "i18next";
import NavBar from "./components/NavBar";
import AddressList from "./components/AddressList";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchAddressesIfNeeded} from "./redux/actions/actions";


class App extends Component {
    componentDidMount() {
        const { dispatch, selectedApi, addresses } = this.props
        console.log(this.props);
        dispatch(fetchAddressesIfNeeded(selectedApi))
    }
    render() {
        return (
            <div className="App">
                <NavBar></NavBar>
                <AddressList addresses={this.props.addresses}/>
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
