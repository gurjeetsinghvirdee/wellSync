'use client'

import { useState } from "react";
import { account } from "src/lib/appwrite";

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await account.createSession(email, password);
            alert('Log-in successful');
        }  catch (error) {
            console.error(error);
            alert('Error during log-in');
        }
    };

    return (
        <div>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            <button onClick={handleLogin}>
                Log In
            </button>
        </div>
    );
};

export default LogIn;