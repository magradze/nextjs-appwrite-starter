import { Client, Account, OAuthProvider, Databases, Avatars, ID } from 'appwrite';

export const client = new Client();
export const database = new Databases(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

export const account = new Account(client);
export const avatars = new Avatars(client);
// export { ID, OAuthProvider } from 'appwrite';

export const AppwriteService = {
  signOut: async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error(error);
    }
  },
  getAccount: async () => {
    try {
      return await account.get<any>();
    } catch (error) {
      console.error(error);
    }
  },
  getAvatar: async (name: string) => {
    try {
      return avatars
        .getInitials(name.split("").reverse().join(""), 256, 256)
        .toString();
    } catch (error) {
      console.error(error);
    }
  },
  setSession: (hash: string) => {
    const authCookies: any = {};

    try {
      authCookies['session'] = hash;
      client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
    } catch (error) {
      console.error(error);
    }
  },
};

export { ID, OAuthProvider}