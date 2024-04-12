import { decrypt } from "@/action/auth-action";
import { getUserdata } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server"
import { object, z } from "zod";

const schema = z
	.object({
		amount: z.number({ required_error: "กรุณาระบุจำนวนเงิน" }),
	})
	.strict({ message: "ไม่รองรับข้อมูลที่ไม่ได้ระบุ" });

export const POST = async (request : Request) => {
    const body = await request.json()
    const data = schema.safeParse(body)
	if (!data.success) return returnRes("no data",404)


    const session = request.headers.get("session");
    if(!session) return returnRes("no session found",404)

    const userId = await decrypt(session);
    console.log(userId.userdata.id)
	console.log(data.data.amount)
    // return returnRes(userData,200)

	const addtopupHistory = await prisma.topupHistory.create({
		data : {
			user_id : userId.userdata.id,
			amount : data.data.amount
		}
	})
	if(!addtopupHistory) return returnRes("fail to create topup history" , 500)
	const userData = await prisma.user.findFirst({
		where : {
			id : userId.userdata.id
		},
		select : {
			id: true,
			email: true,
			credits : true
		}
	})
	if(!userData) return returnRes("user not found", 404)
	const newamount = Number(userData.credits) + data.data.amount;

	const updateUserCredits = await prisma.user.update({
		data : {
			credits : newamount
		},
		where : {
			id : userData.id
		}
	})
	if(!updateUserCredits) return returnRes("failed to update user create",500)
	const updateTopup = await prisma.topupHistory.update({
		data : {
			status : "PAID"
		},
		where : {
			id : addtopupHistory.id
		}
	})
	if(!updateTopup) return returnRes("failed to update topup history",500)
	
	await prisma.$disconnect();
	
	return returnRes(`update sucessfully new amount for ${userData.email} is ${newamount}`)


    // if (!data.success) {
	// 	return new Response(
	// 		JSON.stringify({
	// 			error: data.error.errors[0].message,
	// 		}),
	// 		{
	// 			status: 400,
	// 		}
	// 	);
	// }

    // return NextResponse.json(({data : data.data , body : body}), {
	// 	status: 200,
	// });
}

function returnRes(message: string | object , status: number = 200) {
    return NextResponse.json({message : message},{
        status : status
    })
}