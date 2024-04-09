import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// const emailService = new EmailService()

// async function main() {
//   const allUsers = await prisma.user.findMany()
//   const emails = allUsers.map((x) => x.email)

//   await emailService.send(emails, 'Hello!')
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })