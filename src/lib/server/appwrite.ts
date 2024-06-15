import { Client, Account, OAuthProvider, Databases } from 'node-appwrite';
import {cookies} from 'next/headers';


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

const logOut = async () => {
  const { account } = await createAdminClient();
  console.log(
    account.getSession('current')
  );
  // await account.deleteSession('current');
};

export {
  createAdminClient,
  createSessionClient,
  getLoggedInUser,
  logOut,
  adminClient,
  Client,
  Account,
  OAuthProvider,
  Databases,
};