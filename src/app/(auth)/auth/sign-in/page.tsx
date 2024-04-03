"use client";

import React, { useState } from 'react'
import Swal from 'sweetalert2';
// import { login } from '@/action/auth-action';
import { useRouter } from "next/navigation";
import { FormLogin } from "@/components/auth/form"

export default function Loginform() {
    return (
        <>
        <title>เข้าสู่ระบบ</title>
        <FormLogin />
        </>
    )
}
