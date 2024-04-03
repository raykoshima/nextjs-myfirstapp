"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from 'react'
import { logout } from "@/libs/auth";


export function Navbar({
  session
} : {
  session : string
}) {

    return ( 
    <>
    <div className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-white font-bold">Your Company</Link>
      <ul className="flex space-x-4">
        <li className="text-white">Hi</li>
        <li className="text-white">your session is {JSON.stringify(session, null, 2)}</li>
        {/* <li className="text-white">welcome back {session.checkuser.email}</li> */}
        {/* <li>{ user ? (
            <a href="#" className="text-white">Hello {user.email}</a>
        )   : (
            <a href="#" className="text-white">Hello ds</a>
        ) 
    }
            </li> */}
        <li><Link href={"/auth/sign-in"}><Button className="text-white" color="secondary">Sign in</Button></Link></li>
        <li><Link href={"/auth/sign-up"}><Button className="text-white" color="secondary">Sign up</Button></Link></li>
      </ul>
    </div>
  </div>
  </>
    )
}