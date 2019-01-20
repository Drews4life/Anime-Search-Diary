import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import createStore from '../store';
import PropTypes from 'prop-types';

let store;

class AppStoreProvider extends PureComponent {
  getChildContext() {
    return {
      store,
    };
  }

  static childContextTypes = {
    store: PropTypes.shape({})
  };

  render() {
    const { children } = this.props;

    store = store || createStore();

    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}

export default AppStoreProvider;