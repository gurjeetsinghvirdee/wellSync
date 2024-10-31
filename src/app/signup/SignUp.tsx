'use client'

import { useState } from 'react';
import { account } from 'src/lib/appwrite';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await account.create('[USER_ID]', email, password);
            alert('Sign-up successful')
        } catch (error) {
            alert('Error during sign-up');
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
            <button onClick={handleSignUp}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;