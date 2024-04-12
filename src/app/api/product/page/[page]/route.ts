import { decrypt } from "@/action/auth-action";
import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request,
	{ params }: { params: { page: string } }) => {
    if(isNaN(Number(params.page))) return createRes({message : "กรุณาใส่ตัวเลข"},400)

    const session = req.headers.get("session");
    if(!session) return createRes({message : "no session found"},404)

    const userId = await decrypt(session);
    
    const page = Number(params.page)
    const pageskip = `${page - 1}0`
    const data = await prisma.product.findMany({
        include: {
            Inventory: {
                where : {
                    user_id: userId.userdata.id
                },
                select : {
                    user_id:true
                }
            }
        },
        skip : Number(pageskip),
        take : 10
    })
    
    await prisma.$disconnect();
    // return createRes({message : `done you page is ${params.page}`,skip : `and skip ${pageskip} query`,data})
    return createRes({data})
}

function createRes(message: object , status: number = 200) {
    return NextResponse.json({message},{
        status : status
    })
}