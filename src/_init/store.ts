import { createStore, applyMiddleware, compose } from 'redux';
// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeEnhancers, middleware, sagaMiddleware } from './middleware';
// Types
import { AppState } from '../App/AppReducer';
import { GridState } from '../_sections/Grid';

export interface GlobalState {
  AppState: AppState;
  GridState: GridState;
}

export const store = createStore(rootReducer, composeEnhancers(compose(applyMiddleware(...middleware))));

sagaMiddleware.run(rootSaga);
