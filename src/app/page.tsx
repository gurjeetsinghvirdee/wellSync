import Link from 'next/link';
import '../styles/globals.css';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <header className="text-center py-10 w-full animate-slideIn border-b border-gray-300">
        <h1 className="text-4xl font-bold mb-4 text-pink-600">Fitness Tracker & Wellness Journal</h1>
        <p className="text-lg text-gray-600">Your companion for a healthier lifestyle.</p>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <section className="text-center mb-10 animate-fadeIn">
          <h2 className="text-3xl font-bold mb-5 text-pink-600">Track, Reflect, Thrive</h2>
          <p className="text-lg mb-5 max-w-xl mx-auto text-gray-700">
            Stay on track with your fitness goals, monitor your nutrition, and reflect on your wellness journey.
          </p>
          <Link href="/signup" legacyBehavior>
            <a className="inline-block bg-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-105">
              Get Started
            </a>
          </Link>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-10 animate-fadeIn">
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-pink-200">
            <h3 className="text-2xl font-semibold text-pink-600 mb-2">Track Activities</h3>
            <p className="text-gray-700">Log your workouts and sync with Google Fit to keep track of your daily activities and progress.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-pink-200">
            <h3 className="text-2xl font-semibold text-pink-600 mb-2">Nutrition Insights</h3>
            <p className="text-gray-700">Log your meals and get detailed nutritional information to stay informed about your diet.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-pink-200">
            <h3 className="text-2xl font-semibold text-pink-600 mb-2">Wellness Journal</h3>
            <p className="text-gray-700">Write daily entries and tag your moods and activities to reflect on your wellness journey.</p>
          </div>
        </section>
      </main>
      <footer className="py-4 w-full text-center bg-pink-600">
        <p className="text-white">&copy; 2024 Fitness Tracker & Wellness Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;