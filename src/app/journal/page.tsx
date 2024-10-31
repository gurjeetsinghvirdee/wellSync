'use client';
import { useState, useEffect } from 'react';
import { databases } from 'src/lib/appwrite';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    // Fetch journal entries
    const fetchEntries = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 
          process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID! 
        );
        setEntries(response.documents);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };
    fetchEntries();
  }, []);

  const handleAddEntry = async () => {
    if (entry && mood) {
      try {
        const date = new Date().toISOString();
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 
          process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID!, 
          'unique()',
          {
            entry,
            mood,
            tags,
            date,
          }
        );
        setEntries([...entries, { entry, mood, tags, date }]);
        setEntry('');
        setMood('');
        setTags([]);
        setMessage('Journal entry added successfully!');
      } catch (error) {
        setMessage('Failed to add journal entry.');
        console.error('Error adding journal entry:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white">
      <header className="text-center py-10 w-full animate-slideIn">
        <h2 className="text-4xl font-bold mb-4">Daily Wellness Journal</h2>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="text-center mb-10 animate-fadeIn">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write about your day..."
            className="mb-4 p-2 rounded-md text-black w-full"
            rows={4}
          />
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mb-4 p-2 rounded-md text-black w-full"
          >
            <option value="" disabled>Select your mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="excited">Excited</option>
            <option value="angry">Angry</option>
          </select>
          <div className="mb-4">
            <label className="block text-black mb-2">Tags:</label>
            <div className="flex flex-wrap">
              {['exercise', 'diet', 'mental health', 'sleep'].map((tag) => (
                <label key={tag} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={tags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags((prevTags) => [...prevTags, tag]);
                      } else {
                        setTags((prevTags) => prevTags.filter((t) => t !== tag));
                      }
                    }}
                    className="mr-2"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddEntry}
            className="bg-white text-primary py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Add Entry
          </button>
          {message && <p className="mt-4">{message}</p>}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl animate-fadeIn">
          {entries.map((entry, index) => (
            <li 
              key={index} 
              className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 text-primary"
            >
              <p className="font-bold">{entry.mood}</p>
              <p>{entry.entry}</p>
              <p className="text-sm">{new Date(entry.date).toLocaleString()}</p>
              <div className="flex flex-wrap">
                {entry.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mt-2">{tag}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="py-4 w-full text-center bg-gradient-to-r from-pink-600 via-purple-700 to-blue-700">
        <p className="text-white">&copy; 2024 Fitness Tracker & Wellness Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Journal;