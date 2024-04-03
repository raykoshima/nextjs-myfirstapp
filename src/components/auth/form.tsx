"use client";

import { login, register } from "@/action/auth-action";
import { loginform, registerform } from "@/libs/types";
import { error } from "console";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

export function FormLogin(){
    const clientAction = async (formData : FormData) =>{
        const data = {
            email : formData.get("email"),
            password : formData.get("password")
        }
        const result = loginform.safeParse(data);
        if(!result.success){
            toast.error(result.error.issues[0].message)
            return
        }

        const respone = await login(result.data)
        if(respone?.error){
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: respone.error
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `ยินดีต้อนรับ ${respone.email}!`,
            });
        }

    }

    return (
        <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10 text-black'>
            <div className="container mx-auto mt-20">
            <form action={clientAction} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl mb-6 text-center font-semibold">Sign In</h2>
                {/* {error && <div className="text-red-500 mb-4 text-center">{error}</div>} */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="text" id="email" name="email" className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input type="password" id="password" name="password" className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Sign In</button>
                <p>ยังไม่มีบัญชี? <a href="/auth/sign-up" className='text-sky-500'>สมัครเลย</a></p>
            </form>
        </div>
        </div>
    )
}

export function FormRegister(){
    const clientAction = async (formData : FormData) =>{
        const data = {
            email : formData.get("email"),
            password : formData.get("password"),
            confirmPassword : formData.get("confirmPassword")
        }
        const result = registerform.safeParse(data);
        if(!result.success){
            toast.error(result.error.issues[0].message)
            return
        }

        const respone = await register(result.data)
        if(respone?.error){
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: respone.error
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Register Successful',
                text: 'กำลังพาไปหน้าแรก!',
            });
        }
          

    }
    return (
        <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10 text-black'>
                    <div className="container mx-auto mt-20">
                        <form action={clientAction} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl mb-6 text-center font-semibold">Sign Up</h2>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input type="text" id="email" name="email" className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                                <input type="password" id="password" name="password" className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Sign Up</button>
                            <p>มีบัญชีอยู่แล้ว? <a href="/auth/sign-in" className='text-sky-500'>เข้าสู่ระบบ</a></p>
                        </form>
                    </div>
                </div>
    )
}