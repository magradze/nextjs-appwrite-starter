import {
  getLoggedInUser
} from "@/lib/server/appwrite";

import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { signInWithEmail } from "@/lib/actions/email-signin";



const SignInPage = async () => {
  const user = await getLoggedInUser();
  if (user) redirect("/account");

  return (
    <div className="flex flex-col gap-4 w-full h-screen justify-center items-center">
      <h1 className="text-4xl font-bold">Sign up</h1>
      <form action={signInWithEmail} className="flex flex-col gap-4">
        <Input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
        />
        <Input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;