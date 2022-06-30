import React from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = ({children, redirectTo}) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to={redirectTo}/>
}

export function AppRoutes() {

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<PrivateRoute redirectTo="/">
                    <Home/>
                </PrivateRoute>}/>
            </Routes>
        </HashRouter>
    )
}