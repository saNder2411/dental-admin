import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

export const sagaMiddleware = createSagaMiddleware();

export const middleware = [sagaMiddleware];
export const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools : composeWithDevTools;
