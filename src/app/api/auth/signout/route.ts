"use server"
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession('current');

    return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_SITE_URL!));
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }

  // const { account } = await createAdminClient();

  // console.log('account', account);

  // // await account.deleteSession('current');


  // try {
  //   // cookies().set('session', '', { expires: new Date(0) });

  //   console.log('cookies', cookies().getAll());

  //   return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_SITE_URL!));
  // } catch (error) {
  //   return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  // }  
}