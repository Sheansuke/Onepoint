import { PrismaClient } from '@prisma/client'
import {seedUserRoles,seedOrderStatus} from "./seedData"
const prisma = new PrismaClient()

const load = async () => {
  try {
    // UserRole ----------------------------------------------------
    await prisma.userRole.deleteMany()
    console.log('Deleted records in UserRole table')
    await prisma.userRole.createMany({
      data: seedUserRoles
    })
    console.log('Added UserRole data')

     // OrderStatus ----------------------------------------------------
     await prisma.orderStatus.deleteMany()
     console.log('Deleted records in OrderStatus table')
     await prisma.orderStatus.createMany({
       data: seedOrderStatus
     })
     console.log('Added OrderStatus data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
