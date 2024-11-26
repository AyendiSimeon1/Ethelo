import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { verifyUser } from '../redux/authReducer';
interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const dispatch = store.dispatch;

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if(token) {
            dispatch(verifyUser());
        }
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}