'use client';
import { useState, useEffect } from 'react';
import { account } from 'src/lib/appwrite';
import 'src/styles/globals.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const fetchUserData = async () => {
      try {
        const user = await account.get();
        setUsername(user.name || '');
        setEmail(user.email || '');
        setBio(user.prefs?.bio || ''); // Assuming user.prefs.bio is a custom attribute
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('You need to log in to update your profile.');
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!isAuthenticated) {
      setMessage('You need to log in to update your profile.');
      return;
    }

    try {
      await account.updateEmail(email, password); // Provide the password
      await account.updateName(username);
      // Update bio as a custom attribute
      await account.updatePrefs({ bio });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <header className="text-center py-10 w-full animate-slideIn border-b border-gray-300">
        <h2 className="text-4xl font-bold mb-4 text-pink-600">Update Your Profile</h2>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="text-center mb-10 animate-fadeIn">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mb-4 p-2 rounded-md text-black w-full border border-pink-200"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 p-2 rounded-md text-black w-full border border-pink-200"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 p-2 rounded-md text-black w-full border border-pink-200"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            className="mb-4 p-2 rounded-md text-black w-full border border-pink-200"
            rows={4}
          />
          <button 
            onClick={handleUpdateProfile} 
            className="bg-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-105"
          >
            Update Profile
          </button>
          {message && <p className="mt-4 text-pink-600">{message}</p>}
        </div>
      </main>
      <footer className="py-4 w-full text-center bg-pink-600">
        <p className="text-white">&copy; 2024 Fitness Tracker & Wellness Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;