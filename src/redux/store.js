
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import reducer from './reducers/index'

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
export let persistor = persistStore(store)

