"use client"
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogOut } from "@/hooks/useAuth";
import Link from "next/link";

interface AuthBlockProps {
  user: any;
  // handleLogout: () => void;
}

const AuthBlock = ({user}: AuthBlockProps) => {
  const {data, error, isLoading, mutate} = useLogOut();

  if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.}</p>;
  
  const handleLogout = () => {
    mutate();
  };

  return (
    <>
    {user ? (
            <div className="flex flex-row gap-4 items-center">
              <a href="/account" className="navbar-item">
                {user.name}
              </a>
              <Button onClick={() => handleLogout()}>Logout</Button>
            </div>
          ) : (
            <div className="flex flex-row gap-4 items-center">
              <Link href="/signin" className="bg-amber-500 px-4 py-2 rounded-md text-xs font-bold uppercase">
                Sign In
              </Link>
              <Link href="/signup" className="bg-amber-500 px-4 py-2 rounded-md text-xs font-bold uppercase">
                Sign Up
              </Link>
              <Link href="http://localhost:3000/api/auth/oauth/github" className="navbar-item">
                <Github size={24} />
              </Link>
              <Link href="http://localhost:3000/api/auth/oauth/google" className="navbar-item">
                G
              </Link>
            </div>
          )}
    </>
  )
};

export default AuthBlock;