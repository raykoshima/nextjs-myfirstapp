import { z } from "zod";

export const loginform = z.object({
    email : z.string({required_error : "กรุณาระบบ email"}).email({message : "รูปแบบ email ไม่ถูกต้อง"}),
    password  : z.string({required_error : "กรุณาระบบรหัสผ่าน"}).min(6, {message : "รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร"})
})

export type LoginForm = z.infer<typeof loginform>

export const registerform = z.object({
    id : z.string().optional(),
    email : z.string({required_error : "กรุณาระบบ email"}).email({message : "รูปแบบ email ไม่ถูกต้อง"}),
    password  : z.string({required_error : "กรุณาระบุรหัสผ่าน"}).min(6, {message : "รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร"}),
    confirmPassword : z.string({required_error : "กรุณาระบุรหัสผ่าน"}),
    firstname : z.string({invalid_type_error : "กรุณาระบุเป็นตัวอักษร"}).optional(),
    lastname : z.string({invalid_type_error : "กรุณาระบุเป็นตัวอักษร"}).optional()
}).refine(data => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"]
});

export type RegisterForm = z.infer<typeof registerform>

export const userdata = z.object({
    id : z.string(),
    email : z.string(),
    credits : z.string(),
    firstname : z.string().optional(),
    lastname : z.string().optional()
})

export type UserData = z.infer<typeof userdata>

export const topupform = z.object({
    amount : z.number({ required_error : "กรุณาใส่จำนวนเงิน", invalid_type_error : "กรุณาระบุเป็นตัวเลข" }).min(1, { message : "กรุณาใส่จำนวนมากกว่า 1"}),
})

export type TopupForm = z.infer<typeof topupform>