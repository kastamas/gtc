import { IApplicationState, reducers } from 'app/reducers';
import rootSaga from 'app/sagas';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { applyMiddleware, combineReducers, compose, createStore as createReduxStore, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const createStore = (initialState: IApplicationState, history: History) => {
  // Middleware Configuration

  const middleware = [sagaMiddleware, routerMiddleware(history)];

  // Store Enhancers

  const windowObject = window as any;
  let composeEnhancers = compose;

  // if (process.env.NODE_ENV === 'development') {
  if (typeof windowObject.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = windowObject.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  // }

  // Store Instantiation

  const storeReducers: Reducer<IApplicationState> = combineReducers({
    ...reducers,
    router: connectRouter(history)
  } as any);

  const rootReducer: Reducer<IApplicationState> = (state, action) => {
    return storeReducers(state, action);
  };

  const store = createReduxStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};
