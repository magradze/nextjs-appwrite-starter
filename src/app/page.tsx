import Navbar from "@/components/partials/navbar";
import RidesList from "@/components/rides/rides-list";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <RidesList />
    </main>
  );
}
