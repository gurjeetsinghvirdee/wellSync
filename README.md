
<!-- GitAds-Verify: NCYTV8JV1AYD8B21MAAU6OVSFRLO83DR -->
![Screenshot 2024-11-01 065848](https://github.com/user-attachments/assets/99803fc9-d01f-4f57-b433-3592c66d1872)

# WellSync

**WellSync** is a comprehensive wellness tracking web app designed to empower users in their fitness journey. Users can log activities, track nutrition, and journal their daily wellness experiences in one place. Built with Next.js, TypeScript, and Tailwind CSS for an intuitive frontend and Appwrite Cloud for backend services, WellSync offers a streamlined, data-driven approach to personal health management.

## Table of Contents

- [WellSync](#wellsync)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [User Authentication](#user-authentication)
    - [Activity Log](#activity-log)
    - [Nutrition Tracker](#nutrition-tracker)
    - [Progress Charts](#progress-charts)
    - [Wellness Journal](#wellness-journal)
    - [Dashboard](#dashboard)
  - [Technology Stack](#technology-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [License](#license)

---

## Features

### User Authentication
- **Sign Up / Log In**: Secure authentication using Appwrite.
- **Profile Management**: Users can update profile details such as age, weight, and fitness goals.

### Activity Log
- **Workouts**: Log workouts manually or sync with APIs (e.g., Google Fit, Fitbit) to track exercise activities.
- **Steps & Heart Rate**: Automatic daily sync of step count and heart rate from connected fitness devices.

### Nutrition Tracker
- **Meal Logging**: Record daily meals and monitor intake.
- **Nutritional Info**: Integration with a nutrition API to fetch caloric and macronutrient data for better tracking.

### Progress Charts
- **Visualization**: Track and display wellness data with interactive charts using Chart.js or D3.js to help visualize progress over time.

### Wellness Journal
- **Daily Entries**: Record daily reflections on wellness and track habits.
- **Moods & Tags**: Add tags and moods to entries for deeper insights into wellness trends.

### Dashboard
- **Overview**: View a summary of recent activities, nutrition, and journal entries in one place.
- **User Insights**: Get personalized insights and tips based on activity data.

---

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Appwrite Cloud for user authentication, database, storage, and functions
- **APIs**: Google Fit API, Calorie Ninja, USDA FoodData Central (for nutritional data)

---

## Getting Started

### Prerequisites
- Node.js
- NPM or Yarn
- Appwrite Cloud Account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/wellSync.git
   cd wellSync

2. Install dependencies

    ```bash
    npm install
    ```

3. Set up environment variables:
- Create a `.env` file at the root of the project and add your API keys and Appwrite configuration:

    ```bash
    # Appwrite

    NEXT_PUBLIC_APPWRITE_PROJECT_ID
    NEXT_PUBLIC_APPWRITE_API_ENDPOINT
    NEXT_PUBLIC_APPWRITE_DATABASE_ID
    NEXT_PUBLIC_APPWRITE_API
    NEXT_PUBLIC_APPWRITE_WORKOUTS_COLLECTION_ID
    NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID

    # CalorieNinja
    NEXT_PUBLIC_CALORIE_YOUR_API_KEY

    # Google Fit
    NEXT_PUBLIC_GOOGLE_API_KEY
    NEXT_PUBLIC_GOOGLE_CLIENT_ID
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Visit `http://localhost:3000` in your browser to see the app.


### API Integrations
1. **Google Fit API**: Syncs daily steps, heart rate, and workout data.
2. **Nutrition API - Calorie Ninja**: Fetches nutritional information for meal entries.

## License
This project is licensed under the BSD 3-Clause [License](https://github.com/gurjeetsinghvirdee/wellSync/blob/master/LICENSE). See the LICENSE file for more details.
