"use client"
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogOut } from "@/hooks/useAuth";
import Link from "next/link";
import LabelStatus from "./label-status";
import { cn } from "@/lib/utils";

interface AuthBlockProps {
  user: any;
  handleLogout: () => void;
}

const AuthBlock = ({user, handleLogout}: AuthBlockProps) => {
  return (
    <>
    {user ? (
            <div className="flex flex-row gap-4 items-center">
              <Link href="/account" className={cn(
                'flex flex-row items-center gap-2 bg-gray-100 px-2 py-1 rounded-md text-xs',
                user.emailVerification && 'border border-amber-500',
              )}>
                {user.name}
                <LabelStatus labels={user.labels} />
                {/* {user.labels && user.labels.includes("admin") && <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">Admin</span>} */}
              </Link>
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