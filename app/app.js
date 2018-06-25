/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';
import axios from 'axios';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

import { showSnackbar } from './containers/HomePage/actions';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

axios.interceptors.response.use(
  response => {
    if (response.status === 275) {
      const message = response.data.statusMessage
        ? response.data.statusMessage
        : response.data;
      store.dispatch(
        showSnackbar(message, {
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 1000,
          variant: 'success',
        }),
      );
    }

    return response;
  },
  error => {
    // Do something with response error

    switch (error.response.status) {
      case 375:
        store.dispatch(
          showSnackbar(error.response.data, { variant: 'warning' }),
        );
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          store.dispatch(push('/login'));
        }, 1000);
        break;
      case 376:
        store.dispatch(showSnackbar(error.response.data, { variant: 'error' }));
        store.dispatch(push('/'));
        break;
      case 401:
        store.dispatch(showSnackbar(error.response.data, { variant: 'error' }));
        break;
      case 475:
        store.dispatch(showSnackbar(error.response.data)); // Updating to have prebuilt and then custom messages.
        break;
      default:
        break;
    }

    return Promise.reject(error);
  },
);

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
