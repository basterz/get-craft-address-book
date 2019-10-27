export const REQUEST_ADDRESS_LIST = 'REQUEST_ADDRESS_LIST';
export const RECEIVE_ADDRESS_LIST = 'RECEIVE_ADDRESS_LIST';
export const SELECT_API = 'SELECT_API';
export const INVALIDATE_API = 'INVALIDATE_API';
export const FILTER_USERS = 'FILTER_USERS';

    // export function selectApi(url) {
    //     return {
    //         type: SELECT_API,
    //         url
    //     }
    // }
    //
    // export function invalidateApi(url) {
    //     return {
    //         type: INVALIDATE_API,
    //         url
    //     }
    // }

function requestAddresses(url) {
    return {
        type: REQUEST_ADDRESS_LIST,
        url
    }
}

function receiveAddresses(url, json) {
    return {
        type: RECEIVE_ADDRESS_LIST,
        url,
        addresses: json.results,
        receivedAt: Date.now()
    }
}

// function filterUsers(word) {
//     return {
//         type: FILTER_USERS,
//         word: word
//     }
// }

function fetchAddresses(url) {
    return dispatch => {
        dispatch(requestAddresses(url))
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveAddresses(url, json)))
    }
}

function shouldFetchAddresses(state, url) {
    const addresses = state.addressesByApi[url];
    if (!addresses) {
        return true
    } else if (addresses.isFetching) {
        return false
    } else {
        return addresses.didInvalidate
    }
}

export function fetchAddressesIfNeeded(url) {
    return (dispatch, getState) => {
        if (shouldFetchAddresses(getState(), url)) {
            return dispatch(fetchAddresses(url))
        }
    }
}

