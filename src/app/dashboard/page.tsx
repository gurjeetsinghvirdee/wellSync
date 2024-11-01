'use client';
import { useEffect, useState } from 'react';
import { getStepsData } from 'src/lib/google-api';
import { databases, account } from 'src/lib/appwrite';
import ProgressChart from 'src/components/ProgressChart';
import 'src/styles/globals.css';

const Dashboard = () => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null); // To store user info
  const [insights, setInsights] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userData = await account.get(); 
        setUser(userData);

        // Fetch manual workouts from Appwrite
        const workoutsResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_WORKOUTS_COLLECTION_ID!
        );
        const manualWorkouts = workoutsResponse.documents.map(doc => doc.steps || 0);

        // Fetch steps data from Google Fit
        const googleData = await getStepsData();
        const googleSteps = googleData.bucket.map(bucket => {
          return bucket.dataset[0].point.reduce((total, point) => total + point.value[0].intVal, 0);
        });

        // Combine data
        const allStepsData = [...manualWorkouts, ...googleSteps];
        const uniqueLabels = Array.from(new Set([
          ...manualWorkouts.map((_, index) => `Manual Day ${index + 1}`),
          ...googleSteps.map((_, index) => `Google Fit Day ${index + 1}`)
        ]));

        setChartData(allStepsData);
        setLabels(uniqueLabels);

        // Fetch journal entries
        const journalResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID!
        );
        setEntries(journalResponse.documents);

        // Generate insights
        const insights = generateUserInsights(manualWorkouts, journalResponse.documents);
        setInsights(insights);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const generateUserInsights = (workouts, journalEntries) => {
    // Analyze workouts data
    const mostActiveDay = workouts.reduce((acc, curr) => {
      const day = new Date(curr.date).getDay();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
    const activeDay = Object.keys(mostActiveDay).reduce((a, b) => mostActiveDay[a] > mostActiveDay[b] ? a : b);

    // Analyze journal entries
    const moodCounts = journalEntries.reduce((acc, curr) => {
      acc[curr.mood] = (acc[curr.mood] || 0) + 1;
      return acc;
    }, {});
    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);

    return {
      activeDay: `You've been most active on ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][activeDay]}!`,
      commonMood: `Your most common mood has been ${mostCommonMood}.`
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <header className="text-center py-10 w-full animate-slideIn border-b border-gray-300">
        <h2 className="text-4xl font-bold mb-4 text-pink-600">Your Fitness Dashboard</h2>
        {user && <p className="text-lg">Welcome back, {user.name}!</p>}
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="w-full max-w-5xl mb-10 animate-fadeIn">
          <h3 className="text-3xl font-bold text-center mb-5 text-pink-600">Progress Chart</h3>
          <ProgressChart data={chartData} labels={labels} />
        </div>
        <div className="w-full max-w-5xl mb-10 animate-fadeIn">
          <h3 className="text-3xl font-bold text-center mb-5 text-pink-600">Journal Entries</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {entries.map((entry, index) => (
              <li 
                key={index} 
                className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-pink-200 text-primary"
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
        </div>
        <div className="w-full max-w-5xl mb-10 animate-fadeIn">
          <h3 className="text-3xl font-bold text-center mb-5 text-pink-600">User Insights</h3>
          <p className="text-lg text-center mb-5">{insights.activeDay}</p>
          <p className="text-lg text-center mb-5">{insights.commonMood}</p>
        </div>
      </main>
      <footer className="py-4 w-full text-center bg-pink-600">
        <p className="text-white">&copy; 2024 Fitness Tracker & Wellness Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;