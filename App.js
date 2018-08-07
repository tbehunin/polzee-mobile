import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Amplify from 'aws-amplify';
import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer';
import config from './aws-exports';

Amplify.configure(config);

const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
    const enhancer = composeEnhancers(applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    ));

    return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const App = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

export default App;
