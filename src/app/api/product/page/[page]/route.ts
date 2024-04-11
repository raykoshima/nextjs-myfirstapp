import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request,
	{ params }: { params: { page: string } }) => {
    if(isNaN(Number(params.page))) return createRes({message : "กรุณาใส่ตัวเลข"},400)
    const page = Number(params.page)
    const pageskip = `${page - 1}0`
    const data = await prisma.product.findFirst({
        skip : Number(pageskip),
        take : 10
    })
    
    
    // return createRes({message : `done you page is ${params.page}`,skip : `and skip ${pageskip} query`,data})
    return createRes({data})
}

function createRes(message: object , status: number = 200) {
    return NextResponse.json({message},{
        status : status
    })
}