"use server";
import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

export const signUpWithEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const { account } = await createAdminClient();

  await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/");
}