'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { account } from 'src/lib/appwrite';
import 'src/styles/globals.css';

const Navigation = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="bg-pink-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Fitness Tracker & Wellness Journal</h1>
      <nav className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/meal-log">Meal Log</Link>
        {user ? (
          <>
            <span className="flex items-center space-x-2">
              <img src={user.prefs.avatar || '/default-avatar.png'} alt="Avatar" className="w-8 h-8 rounded-full" />
              <span>{user.name}</span>
            </span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full transition">Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Navigation;