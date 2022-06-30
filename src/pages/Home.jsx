import React from 'react';

import { useAuth } from '../contexts/AuthContext';

export function Home() {
    
    const { endSession, userInfo } = useAuth();

    function logout() {
        endSession();
    }

    return (
        <div className='container'>
            <h1 className='primary-title'>Olá {userInfo.name} !!</h1>
            <h2 className='secondary-title'>Seja bem vindx</h2>
            <button type="button" onClick={logout} className="btn-logout">Sair</button>
        </div>
    )
}