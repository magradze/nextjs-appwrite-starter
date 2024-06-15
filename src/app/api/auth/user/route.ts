import { createSessionClient } from "@/lib/server/appwrite";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { account } = await createSessionClient();

  try {
    const user = await account.get();

    return new Response(JSON.stringify(user), {
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