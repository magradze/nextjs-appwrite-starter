'use client';
import { Client, Databases } from 'appwrite';
import { useEffect, useState } from 'react';

interface Document {
  $id: string;
  from: string;
  to: string;
}

const RidesList = () => {

  const [rides, setRides] = useState<Document[]>([]);

  const client = new Client()

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!) // Your project ID;

  const databases = new Databases(client);

  const listRides = async () => {
    try {
      const response = await databases.listDocuments(process.env.NEXT_PUBLIC_DB_ID!, '666dfea6000a8199120c');
      setRides(response.documents as unknown as Document[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listRides();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Rides</h1>
      <ul className="mt-8">
        {rides.map((ride) => (
          <li key={ride.$id} className="flex items-center justify-between w-full p-4 my-2 bg-gray-200 rounded-md">
            <p>{ride.from} - {ride.to}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RidesList;