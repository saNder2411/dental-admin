import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// App
import { App } from './_App';
// Instruments
import { store } from './_init';
import * as serviceWorker from './serviceWorker';
import { SP_API } from './_REST/API';

const fetchSP = async () => {
  try {
    const spResult = await SP_API.agenda.gdSPrest();
    console.log('spResult', spResult);
  } catch (error) {
    console.log('error', error);
  }
};

fetchSP();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
