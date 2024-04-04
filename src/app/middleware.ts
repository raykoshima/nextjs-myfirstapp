import { NextRequest } from "next/server";
import { updateSession } from "@/libs/auth";

export async function middleware(request: NextRequest) {
  console.log("runing middleware")
  return await updateSession(request);
}

// export const config = {
//   matcher: '/:path*',
// }
