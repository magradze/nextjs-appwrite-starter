import { createAdminClient } from "@/lib/server/appwrite";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

  const { account } = await createAdminClient();

  try {
    // await account.deleteSession('current');
    cookies().set("session", '', {});
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }

  // revalidatePath('/');
  // revalidateTag('user');

  return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_SITE_URL!));
}




// cookies().delete("session");

//     revalidateTag("logout");
//     revalidatePath(process.env.NEXT_PUBLIC_SITE_URL!);
//     return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL!);