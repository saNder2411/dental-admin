import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// App
import { App } from './_App';
// Instruments
import { store } from './_init';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
