"use server";

import { prisma } from "@/libs/prisma";
import { loginform, registerform } from "@/libs/types";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.SECRET_KEY);
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10 sec from now")
      .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }


export const login = async (formData : unknown) => {
    const result = loginform.safeParse(formData);

    if(!result.success){
        return {
            error : result.error.issues[0].message
        }
    }

    const user = await prisma.user.findFirst({
        where : {
            email : result.data.email,
        }
    })
    if(!user) return {
        error : "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
    }
    const pwOk = await compareSync(result.data.password,user.password)
    if(!pwOk) return {
        error : "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
    }
    user.password = "you not need to know"
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });
    cookies().set("session", session, { expires, httpOnly: true });
    
    return {
        email : result.data.email
    }

}

export const register = async (formData : unknown) => {
    const result = registerform.safeParse(formData);
    if(!result.success){
        return {
            error : result.error.issues[0].message
        }
    }

    const checkEmail = await prisma.user.findFirst({
        where : {
            email : result.data.email
        }
    })
    if(checkEmail) return {
        error : "email นี้ถูกใช้งานไปแล้ว"
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(result.data.password,salt)
    const id = randomUUID().replaceAll("-","")

    const data = {
        id,
        email : result.data.email,
        password : hashedPassword,
    }

    const user = await prisma.user.create({
        data : data
    })

    user.password = "you not need to know"
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });
    cookies().set("session", session, { expires, httpOnly: true });
    
    // return {
    //     error : `id is ${id} email is ${data.email} and password is ${data.password}`
    // }
}