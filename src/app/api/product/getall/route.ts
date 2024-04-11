import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    
    const product = await prisma.product.findMany({
        
    })
    if(product.length === 0) return returnRes({message : "no product found"},404)

    return returnRes(product)
}

function returnRes(message: object , status: number = 200) {
    return NextResponse.json({message},{
        status : status
    })
}