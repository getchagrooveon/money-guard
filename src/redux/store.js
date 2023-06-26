import { authReducer } from './auth/slice';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { transactionsReducer } from './transactions/slice';
import { currencyReducer } from './currency/slice';
import { globalReducer } from './global/slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const currencyPersistConfig = {
  key: 'currencyRates',
  storage,
  whitelist: ['USD', 'EUR'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const currencyPersistedReducer = persistReducer(
  currencyPersistConfig,
  currencyReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    transaction: transactionsReducer,
    currency: currencyPersistedReducer,
    global: globalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
