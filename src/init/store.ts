import { createStore, applyMiddleware, compose } from 'redux';
// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeEnhancers, middleware, sagaMiddleware } from './middleware';


export const store = createStore(rootReducer, compose(composeEnhancers, applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);


