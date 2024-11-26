import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UseAppSelector } from '../redux/store';

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = UseAppSelector((state) => state.auth);
    const router = useRouter();
    useEffect(() => {
        if(!isLoading) {
            if (!isAuthenticated){
                router.push('/login');
            }
        }
    }, [isAuthenticated, isLoading, router]);
    if( isLoading ) {
        return <div>Loading ....</div>
    }

    return isAuthenticated ? <>{children} </> : null;
    
};

export default ProtectedRoute;