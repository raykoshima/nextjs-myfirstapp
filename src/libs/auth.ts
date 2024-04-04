"use server";
import { decrypt, encrypt } from "@/action/auth-action";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";


export async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    const sessionData = await decrypt(session)
    return sessionData
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 86400 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }

export async function getUserdata() {
  const session = cookies().get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  const respone = await prisma.user.findFirst({
    where : {
      id : parsed.userdata.id
    }
  })
  if(!respone) return
  const data = {
    id : respone.id,
    email : respone.email,
    credits : respone.credits.toFixed(2),
    firstname : respone?.firstname,
    lastname : respone?.lastname
  }
  return data
}