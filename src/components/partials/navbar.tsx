import { getLoggedInUser } from "@/lib/server/appwrite";
import AuthBlock from '../shared/auth-block';
import {cookies} from "next/headers";
import { redirect } from "next/navigation";

const Navbar = async () => {

  const user = await getLoggedInUser();

  const handleLogout = async () => {
    "use server";

    const cookie = cookies().get('session');

    const res = await fetch("http://localhost:3000/api/auth/signout", {
      method: "POST",
      headers: {
        "cookie": `session=${cookie?.value}`,
      },
    });

    if (res.ok) {
      redirect("/");
    }
  };

  return (
    <nav className="w-full mb-8">
      <div className="container flex">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <h1 className="title is-4">My Site</h1>
          </a>
        </div>
        <div className="ml-auto flex flex-row gap-4 justify-between items-center">
          <div className="flex flex-row gap-4">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/about" className="navbar-item">
              About
            </a>
            <a href="/contact" className="navbar-item">
              Contact
            </a>
          </div>
          <AuthBlock user={user} handleLogout={handleLogout}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;