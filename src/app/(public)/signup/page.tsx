import {
  getLoggedInUser
} from "@/lib/server/appwrite";

import { Input } from "@/components/ui/input";
import { signUpWithEmail } from "@/lib/actions/email-signup";
import { redirect } from "next/navigation";



const SignUpPage = async () => {
  const user = await getLoggedInUser();
  if (user) redirect("/account");

  return (
    <div className="flex flex-col gap-4 w-full h-screen justify-center items-center">
      <h1 className="text-4xl font-bold">Sign up</h1>
      <form action={signUpWithEmail} className="flex flex-col gap-4">
        <Input
          id="name"
          name="name"
          placeholder="Full name"
          type="text"
        />
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUpPage;