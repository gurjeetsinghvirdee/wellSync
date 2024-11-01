'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Client, Account } from 'appwrite';
import 'src/styles/globals.css';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const account = new Account(client);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await account.createSession(email, password);
      alert('Login successful');
      router.push('/dashboard'); // Redirect to Dashboard
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-pink-200">
        <h1 className="text-2xl font-semibold mb-6 text-center text-pink-600">Login</h1>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        
        <button
          onClick={handleLogin}
          className="w-full bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition transform hover:scale-105"
        >
          Log In
        </button>
        
        {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
        
        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-pink-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;