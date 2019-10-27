import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import i18n from "./i18n/i18n";
import {I18nextProvider} from "react-i18next";
import {Provider} from "react-redux";
import configureStore from "./redux/store/configureStore";

const store = configureStore();
const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback="loading">
            <I18nextProvider i18n={i18n}>
                <App/>
            </I18nextProvider>
        </Suspense>
    </Provider>,
    rootElement
);
serviceWorker.unregister();
