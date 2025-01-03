import { 
    configureStore, 
    ThunkAction, 
    Action,
    combineReducers, 
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import categoryReducer from './categoryReducer';
import projectReducer from './productReducer';
import applicationReducer from './applicationReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    project: projectReducer,
    application: applicationReducer
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

export interface RootStateInterface {
    [x: string]: any;
    auth: ReturnType<typeof authReducer>;
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateInterface> = useSelector;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateInterface,
    unknown,
    Action
>;

export const persistor = persistStore(store);