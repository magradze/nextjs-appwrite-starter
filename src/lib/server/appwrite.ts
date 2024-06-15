import { Client, Account, OAuthProvider, Databases } from 'node-appwrite';
import {cookies} from 'next/headers';

const ENDPOINT = "https://console.hoppla.autos/v1";
const PROJECT_ID = "66688eaa0009496c2951";
const APPWRITE_API_KEY = "d1d50640bd802f169de202b2ab63fff734b260c1abee67fa2e91ddc2c9069c41a0ac97faae3fa6cc3b1928cf1d06c660b6b35a80c89a9214ad5b328e955b6b05c53b62204f316953cb0bc46792a9be0771c24c8a72412e8301fa254f43583a1ace9e12d073f27dac8f223b7acd27d9cba5b0ea8bc17ba631f1e8621b7779952f";

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