import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export function Login() {
    const navigate = useNavigate();

    const { beginSession } = useAuth();

    const [dataInfo, setDataInfo] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDataInfo(values => ({...values, [name]: value}))
    }

    async function handleSignIn() {
        await beginSession(dataInfo);
        navigate("/home");
    }

    return (
        <div className="container-form">
            <h1>Login</h1>
            <div className='form-group'>
                <input type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="type your username"
                    value={dataInfo.username || ''}
                    onChange={handleChange}/>

                <input type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="type your password"
                    value={dataInfo.password || ''}
                    onChange={handleChange}/>
            </div>   
            
            <button onClick={handleSignIn} type="button" className="btn">Login</button>
        </div>
    )
}