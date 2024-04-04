"use client";
import Link from "next/link";
import { GuestNavBar, UserNavbar } from "./ui/navbar/user-navbar";


export function Navbar({
  session
} : {
  session : any
}) {
  if(session){
    // console.log(session.userdata.id)
  }

  
    return ( 
    <>
    <div className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-white font-bold">Your Company</Link>
      <ul className="flex space-x-4">
        {session ? (
          <>
          <UserNavbar userdata={session}/>
          </>
        ) : (
          <>
          <GuestNavBar />
          </>
        )
        }   
      </ul>
    </div>
  </div>
  </>
    )
}