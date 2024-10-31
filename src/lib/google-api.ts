import { gapi } from 'gapi-client';

// Extend the global Window interface to include gapi
declare global {
  interface Window {
    gapi: any;
  }
}

export const loadGapi = () => {
  return new Promise((resolve, reject) => {
    if (window.gapi) {
      resolve(window.gapi);
    } else {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        resolve(window.gapi);
      };
      script.onerror = () => {
        reject(new Error('Failed to load gapi script'));
      };
      document.body.appendChild(script);
    }
  });
};

export const loadClient = () => {
  return new Promise((resolve, reject) => {
    loadGapi().then((gapi: any) => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest',
            ],
            scope: 'https://www.googleapis.com/auth/fitness.activity.read',
            redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
          })
          .then(() => {
            resolve(true);
          })
          .catch((error: any) => {
            console.error('Error loading GAPI client:', error);
            reject(error);
          });
      });
    });
  });
};

export const getStepsData = async () => {
  try {
    await loadClient();

    const response = await window.gapi.client.request({
      path: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
      method: 'POST',
      body: {
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
          },
        ],
        bucketByTime: { durationMillis: 86400000 }, // 1 day
        startTimeMillis: new Date().setHours(0, 0, 0, 0),
        endTimeMillis: new Date().getTime(),
      },
    });
    return response.result;
  } catch (error) {
    console.error('Error fetching steps data:', error);
    throw new Error('Failed to fetch steps data');
  }
};