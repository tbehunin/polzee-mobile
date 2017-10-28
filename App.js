import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './app/reducers';
import RootTabs from './RootTabs';

function configureStore(initialState) {
  // middleware here..
  const enhancer = compose();

  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootTabs />
      </Provider>);
    }
}
