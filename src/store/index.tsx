import {persistCombineReducers} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducers from './Reducers';
import sagas from './Sagas';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  key: 'persistTyc',
  storage: AsyncStorage,
  debug: true, //to get useful logging
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const reducers = persistCombineReducers(config, rootReducers);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = [applyMiddleware(...middleware)];

const persistConfig: any = {enhancers};
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware)),
);
const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureStore = () => {
  return {persistor, store};
};

const rootSaga = sagaMiddleware.run(sagas);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
rootSaga.toPromise().catch(error => {
  console.log(error);
});

export default configureStore;
