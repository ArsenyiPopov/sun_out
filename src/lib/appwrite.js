import { Client } from 'appwrite';

export const appwriteClient = new Client();

appwriteClient
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65d99da951216ba0ad14');
