import Link from "next/link";
import '../styles/globals.css';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <header className="text-center py-10 w-full animate-slideIn">
        <h1 className="text-4xl font-bold mb-4">Fitness Tracker & Wellness Journal</h1>
        <p className="text-lg">Your companion for a healthier lifestyle.</p>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <section className="text-center mb-10 animate-fadeIn">
          <h2 className="text-3xl font-bold mb-5">Track, Reflect, Thrive</h2>
          <p className="text-lg mb-5 max-w-xl mx-auto">
            Stay on track with your fitness goals, monitor your nutrition, and reflect on your wellness journey.
          </p>
          <Link href="/signup" legacyBehavior>
            <a className="inline-block bg-white text-primary py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
              Get Started
            </a>
          </Link>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-10 animate-fadeIn">
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="text-2xl font-semibold text-primary mb-2">Track Activities</h3>
            <p className="text-gray-700">Log your workouts and sync with Google Fit to keep track of your daily activities and progress.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="text-2xl font-semibold text-primary mb-2">Nutrition Insights</h3>
            <p className="text-gray-700">Log your meals and get detailed nutritional information to stay informed about your diet.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="text-2xl font-semibold text-primary mb-2">Wellness Journal</h3>
            <p className="text-gray-700">Write daily entries and tag your moods and activities to reflect on your wellness journey.</p>
          </div>
        </section>
      </main>
      <footer className="py-4 w-full text-center bg-gradient-to-r from-purple-600 via-pink-700 to-red-700">
        <p className="text-white">&copy; 2024 Fitness Tracker & Wellness Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;