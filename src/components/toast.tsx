"use client";

import { Toaster } from "react-hot-toast";

export function Toast(){
    return ( 
        <Toaster
            position="top-center"
            reverseOrder={true}
        />
    )
}