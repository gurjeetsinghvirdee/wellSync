import { Client, Account, Databases } from "appwrite";

const client = new Client();
client
    .setEndpoint(process.env.NEXT_APPWRITE_API_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID!) // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);