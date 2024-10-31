import { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Fitness Tracker & Wellness Journal',
  description: 'Track your fitness activities, nutrition, and wellness journey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen flex flex-col font-body antialiased">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-xl font-bold">Fitness Tracker & Wellness Journal</h1>
          <nav>
            <Link href="/workout">Workout Log</Link>
          </nav>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-blue-500 text-white p-4 text-center">
          <p>&copy; 2024 My Fitness App</p>
        </footer>
      </div>
    </>
  );
}