import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck : false
        })
    
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector : TypedUseSelectorHook<RootState> = useSelector;
