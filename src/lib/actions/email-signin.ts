"use server";
import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

export const signInWithEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { account } = await createAdminClient();

  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/");
}