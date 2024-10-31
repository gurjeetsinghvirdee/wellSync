import { Client, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint() // Your API Endpoint
    .setProject("5fca2f3d5fbf3") // Your project ID

export const account = new Account(client);