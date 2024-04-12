import { decrypt } from "@/action/auth-action";
import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request,
	{ params }: { params: { id: string } }) => {
    if(isNaN(Number(params.id))) return createRes({message : "กรุณาใส่ตัวเลข"},400)

    const session = req.headers.get("session");
    if(!session) return createRes({message : "no session found"},404)

    const userId = await decrypt(session);
    
    const data = await prisma.product.findFirst({
        where: {
            id : Number(params.id)
        },
        include: {
            Inventory: {
                where : {
                    user_id: userId.userdata.id
                },
                select : {
                    user_id:true
                }
            }
        }
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