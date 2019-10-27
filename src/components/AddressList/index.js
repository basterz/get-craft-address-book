import {connect} from "react-redux";
import AddressList from "./AddressList";

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


export default connect(mapStateToProps)(AddressList);
