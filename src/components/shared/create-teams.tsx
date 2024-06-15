"use server"
import { Client, Teams, Account } from "appwrite";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

const client = new Client();

const teams = new Teams(client);
const account = new Account(client);

const session = cookies().get('session')?.value;

console.log('session', session);

client
.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!) // Your project ID;
.setSession(session as string) // Your secret API key



const CreateTeams = () => {
  
  
  const createTeamHandler = async () => {
    const promise = teams.create(
      'minivans',
      'Minivans',
      ['driver']
    );
  
    const response = await promise;
  
    console.log(response);
  };

  // createTeamHandler();

  return (
    <>
      <h1>Create Teams</h1>
      {/* <Button onClick={createTeamHandler}>Create Team</Button> */}
    </>
  );
};

export default CreateTeams;