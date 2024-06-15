import { Client, Account, OAuthProvider, Databases } from 'node-appwrite';
import {cookies} from 'next/headers';

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const APPWRITE_API_KEY = process.env.NEXT_PUBLIC_APPWRITE_API_KEY!;

const adminClient = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
};


const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)

  const session = cookies().get('session');

  if (session) {
    client.setSession(session.value);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
};

const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export {
  createAdminClient,
  createSessionClient,
  getLoggedInUser,
  adminClient,
  Client,
  Account,
  OAuthProvider,
  Databases,
};