"use server";
import { getRawSession, getUserdata } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function getMainproduct() {
    const session = await getRawSession();
    if(!session) {
        return {
            error : "no session"
        }
    }
    try {
        const apiUrl = `${process.env.API_URL}/api/product/page/1`;
        const response = await axios.get(apiUrl, {
          headers: {
            session: session
          }
        });
    
        const responseData = response.data;
    
        if (responseData && responseData.message && responseData.message.data) {
          const products = responseData.message.data;
    
          return responseData.message.data; 
        } else {
          console.error('Invalid response format');
          return []; 
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
      }
}

export async function getProductByPage(page : number) {

  const session = await getRawSession();
  if(!session) {
      return {
          error : "no session"
      }
  }
  try {
      const apiUrl = `${process.env.API_URL}/api/product/page/${page}`;
      const response = await axios.get(apiUrl, {
        headers: {
          session: session
        }
      });
  
      const responseData = response.data;
  
      if (responseData && responseData.message && responseData.message.data) {
        const products = responseData.message.data;
  
        return responseData.message.data; 
      } else {
        console.error('Invalid response format');
        return []; 
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      return [];
    }
}

export async function getProductById(id : number) {
    // const session = await getRawSession();
    // if(!session) {
    //     return {
    //         error : "no session"
    //     }
    // }
    //     const apiUrl = `http://localhost:3000/api/product/singleproduct/${id}`;
    //     const response = await axios.get(apiUrl, {
    //       headers: {
    //         session: session
    //       }
    //     });
    //     const responseData = response.data;
    //     // console.log(responseData)
    //     // console.log('API_URL for single:', process.env.API_URL);
    //     return responseData.message.data
    const userdata = await getUserdata();
    if (!userdata) {
      redirect("/auth/sign-in");
    }
    const data = await prisma.product.findFirst({
      where : { id },
      include: {
        Inventory: {
            where : {
                user_id: userdata.id
            },
            select : {
                user_id:true
            }
        }
    },
    })
    await prisma.$disconnect
    return data
}

export async function getOwnedProduct() {
  const userdata = await getUserdata();
    if (!userdata) {
      redirect("/auth/sign-in");
    }
    const data = await prisma.inventory.findMany({
      where : {
        user_id : userdata.id
      },
      include : {
        product : true
      }
    })
    await prisma.$disconnect
    return data
}

export async function buyProduct(id:number) {
  const userdata = await getUserdata();
    if (!userdata) {
      redirect("/auth/sign-in");
    }
  
  const checkInventory = await prisma.inventory.findFirst({
    where : {
      user_id : userdata.id,
      product_id : id
    }
  })
  if(checkInventory) return {
    error : "เป็นเจ้าของ product นี้อยู่แล้ว"
  }
  const productPrice = await prisma.product.findFirst({
    where : {
      id
    },
    select : {
      price : true
    }
  })
  if(!productPrice) return {
    error : "ไม่พบ product"
  }
  const productPriceNum = {
    price : productPrice.price.toFixed(2)
  }
  const creditsChange = Number(userdata.credits) - Number(productPriceNum.price)
  if(creditsChange < 0) return {
    error : "เงินในบัญชีไม่เพียงพอ"
  }
  await prisma.inventory.create({
    data : {
      user_id : userdata.id,
      product_id : id
    }
  })
  await prisma.user.update({
    where : {
      id : userdata.id
    },
    data : {
      credits : creditsChange
    }

  })
  return {
    message : "สั่งซื้อสำเร็จ"
  }
}

function createRes(message: object , status: number = 200) {
  return NextResponse.json({message},{
      status : status
  })
}