"use server";

import { getRawSession } from '@/libs/auth';
import { topupform } from '@/libs/types';
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

export async function topup(data : object) {
    const result = topupform.safeParse(data);
    if(!result.success){
        return { 
            error : "no data amount"
        }
    }
    const session = await getRawSession();
    if(!session) {
        return {
            error : "no session"
        }
    }
    // return {
    //     success : session
    // }
    await axios.post(
        `${process.env.API_URL}/api/topup`,
        {
            amount : result.data.amount
        },
        {
            headers : {
                session : `${session}`
            }
        }
    )
        
    return {
        success : `ได้ทำการเติมเงินทั้งหมด ${result.data.amount} บาท`
    }
}