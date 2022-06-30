import React, { createContext, useState, useEffect, useContext } from 'react';
import { signIn } from '../services/AuthService';

const AuthContextData = {
    isAuthenticated: false,
    userInfo: {},
    beginSession: () => {},
    endSession: () => {}
}

const AuthContext = createContext(AuthContextData);

export const AuthProvider = ({ children }) => {
    const [loggedUser, setLoggedUser ] = useState({});

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await localStorage.getItem("@auth:user");
            const storagedToken = await localStorage.getItem("@auth:token");
        
            if(storagedUser && storagedToken) {
                setLoggedUser(JSON.parse(storagedUser));
            }
        }

        loadStorageData();
    }, []);

    async function beginSession(user) {
        const response = await signIn(user);
        
        await localStorage.setItem("@auth:user", JSON.stringify(response.user));
        await localStorage.setItem("@auth:token", response.token);

        setLoggedUser(response.user)
        console.log(loggedUser)
    }

    const endSession = () => {
        setLoggedUser(null);
        localStorage.removeItem("@auth:user")
        localStorage.removeItem("@auth:token")
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!loggedUser,
            userInfo: loggedUser, 
            beginSession,
            endSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export default AuthContext;