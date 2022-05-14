import { PrismaClient } from '@prisma/client'
import {seedUserRoles,seedOrderStatus, seedPaymentType, seedProduct} from "./seedData"

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

     // PaymentType ----------------------------------------------------
     await prisma.paymentType.deleteMany()
     console.log('Deleted records in PaymentType table')
     await prisma.paymentType.createMany({
       data: seedPaymentType
     })
     console.log('Added PaymentType data')

     // Product ----------------------------------------------------
     await prisma.product.deleteMany()
     console.log('Deleted records in product table')
     await prisma.product.createMany({
       data: seedProduct
     })
     console.log('Added product data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
