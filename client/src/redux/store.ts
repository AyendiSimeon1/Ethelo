// redux/store.ts
import { 
    configureStore, 
    ThunkAction, 
    Action, 
    Middleware,
    
    UnknownAction,
    AnyAction
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authReducer';

// Define reducers separately to break circular reference
const rootReducer = {
    auth: authReducer,
};

// Explicitly type the store configuration
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore specific action types if needed
                ignoredActions: []
            }
        })
});

// Define RootState using a type instead of typeof
export interface RootStateInterface {
    auth: ReturnType<typeof authReducer>;
}

// Typed versions of useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateInterface> = useSelector;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Define ThunkAction type for async operations
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateInterface,
    unknown,
    Action
>;