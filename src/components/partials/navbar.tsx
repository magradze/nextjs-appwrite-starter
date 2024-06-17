"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

// import { getLoggedInUser } from "@/lib/server/appwrite";
// import AuthBlock from '../shared/auth-block';
// import {cookies} from "next/headers";
// import { redirect } from "next/navigation";

const Navbar = () => {

  // const user = await getLoggedInUser();

  // const handleLogout = async () => {
  //   "use server";

  //   const cookie = cookies().get('session');

  //   const res = await fetch("http://localhost:3000/api/auth/signout", {
  //     method: "POST",
  //     headers: {
  //       "cookie": `session=${cookie?.value}`,
  //     },
  //   });

  //   if (res.ok) {
  //     redirect("/");
  //   }
  // };

  const { login, user, loading, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await login(
      email,
      password
    );
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

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
          {/* SWR Login */}
          {/* <AuthBlock user={user} handleLogout={handleLogout}/> */}
          {user ? (
            <>
            <p>{user.email}</p>
            <button onClick={handleLogout} className="button">Logout</button>
            </>
          ) : (
            <>
            <div className="flex flex-row gap-4">
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
              <button type="submit" className="button">Login</button>
            </form>
          </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;