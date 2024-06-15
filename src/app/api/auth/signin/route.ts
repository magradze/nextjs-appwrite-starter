import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: new Date(session.expire).getTime(),
      path: "/",
    });

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}