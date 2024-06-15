import { AppwriteService } from "@/lib/client/appwrite";
import { Account, adminClient } from "@/lib/server/appwrite";
import { NextApiRequest } from "next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest, response: any) {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const account = new Account(adminClient);

  // Get the userId and secret from the URL parameters
  const userId = new URL(request.url as string).searchParams.get('userId');
  const secret = new URL(request.url as string).searchParams.get('secret');

  // Ensure userId and secret are strings
  if (typeof userId !== 'string' || typeof secret !== 'string') {
    return response.status(400).json({ error: 'Invalid userId or secret' });
  }

  try {
    // Create the session using the Appwrite client
    const session = await account.createSession(userId, secret);

    // Calculate maxAge in seconds
    const maxAge = (new Date(session.expire).getTime() - Date.now()) / 1000;

    cookies().set('session', session.secret, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: maxAge });

    AppwriteService.setSession(
      session.$id
    )

    revalidatePath('/');
    return NextResponse.redirect(url, { status: 302 });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}