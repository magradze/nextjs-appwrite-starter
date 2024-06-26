import { Client, Account, OAuthProvider, adminClient } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
  const account = new Account(adminClient);

  try {
    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,                // Provider
      process.env.NEXT_PUBLIC_SUCCESS_URL, // Success URL
      process.env.NEXT_PUBLIC_FAILURE_URL, // Failure URL
      ['profile', 'email']
    );

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
  }
}