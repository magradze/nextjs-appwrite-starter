"use client"
import { Client, Account } from "appwrite";
import { useEffect } from "react";

const AccountPage = () => {

  const client = new Client()
    .setEndpoint("https://appwrite.hoppla.autos/v1")
    .setProject("666de9da00196255c339")
  const account = new Account(client);

  const getLoggedInUser = async () => {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <div>
      <h1>Account Page</h1>
    </div>
  );
};

export default AccountPage;