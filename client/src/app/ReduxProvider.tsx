"use client";
import react from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
interface ProviderProps {
    children: react.ReactNode
}

export function Providers ({ children }: ProviderProps ) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>    
        </Provider>
    )
};