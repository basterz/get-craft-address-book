import { combineReducers } from 'redux'
import {FILTER_USERS, INVALIDATE_API, RECEIVE_ADDRESS_LIST, REQUEST_ADDRESS_LIST, SELECT_API} from "../actions/actions";

function selectedApi(state = 'https://randomuser.me/api/?results=10', action) {
    switch (action.type) {
        case SELECT_API:
            return action.url
        default:
            return state
    }
}

function addressList(
    state = {
        isFetching: false,
        didInvalidate: false,
        addresses: []
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_API:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_ADDRESS_LIST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_ADDRESS_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                addresses: action.addresses,
                lastUpdated: action.receivedAt
            })
        case FILTER_USERS:
            const {value} = action.word;
            const results = state.addresses.filter((val) => {
                return val.name.first.includes(value) ||
                    val.name.last.includes(value) ||
                    val.phone.includes(value)
            });
            return {...state, value, results};
        default:
            return state
    }
}

function addressesByApi(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_API:
        case RECEIVE_ADDRESS_LIST:
        case REQUEST_ADDRESS_LIST:
            return Object.assign({}, state, {
                [action.url]: addressList(state[action.url], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    selectedApi,
    addressesByApi
})

export default rootReducer
