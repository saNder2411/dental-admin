import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools : composeWithDevTools;

export { middleware, sagaMiddleware, composeEnhancers };
