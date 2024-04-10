"use client";

import { topupform } from "@/libs/types";
import toast from "react-hot-toast";
import { topup } from "@/action/topup-action";

// import { redirect } from "next/navigation";

export default function Home() {
  // const { user } = await validateRequest();
  // if (!user) {
	// 	redirect("/auth/sign-in");
	// }

  const clientAction = async (formData : FormData) =>{
    const data = {
        amount : Number(formData.get("amount")),
    }
    const result = topupform.safeParse(data);
    if(!result.success){
        toast.error(result.error.issues[0].message)
        return
    }
    const respones = await topup(data)
    if(respones.error) {
     toast.error(respones.error)
     return
    }else{
      toast.success(`${respones.success}`)
      setTimeout(function() {
        location.reload()
      }, 1500);
      
      
    }
    // toast.success(`ได้ทำการเติมเงิน ${data.amount} บาท`)

    

}


  return (
  <>
      <title>เติมเงิน</title>
      <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10 '>
        <div className="container mx-auto mt-20">
          <form action={clientAction} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl mb-6 text-center font-semibold text-black">เติมเงิน</h2>

            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">จำนวนเงิน (บาท)</label>
              <input type="text" id="amount" name="amount" className="text-black border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">ส่งคำขอ</button>
          </form>
        </div>
      </div>
  </>
  );
}
