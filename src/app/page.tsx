import Navbar from "@/components/partials/navbar";
import RidesList from "@/components/rides/rides-list";
import CreateTeams from "@/components/shared/create-teams";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <CreateTeams />
      <RidesList />
    </main>
  );
}
