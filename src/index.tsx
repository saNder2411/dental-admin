import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// App
import { App } from './_App';
// Instruments
import { store } from './_init';
import * as serviceWorker from './serviceWorker';
import { SP_API } from './_REST/API';

SP_API.agenda.pnpSP();
SP_API.agenda.items();
SP_API.agenda.originalUrl1()
SP_API.agenda.originalUrl2()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
