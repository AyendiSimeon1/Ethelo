import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const dispatch = store.dispatch;

    useEffect(() => {
        const token = localStorage.getItem('authToken');

      
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}