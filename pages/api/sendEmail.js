import { sendEmail } from '../../utils/sendEmail'

const items = [
  {
    name: 'Grapadora',
    price: '$100',
    quantity: '1',
    subtotal: '$100'
  },
  {
    name: 'Grapadora',
    price: '$200',
    quantity: '3',
    subtotal: '$300'
  }
]
const testDataUser = {
  template: "user",
  subject: "Orden realizada!",
  to: "sheansuke3@gmail.com",
  deliveryAddress: {
    name: "Jean",
    lastName: "Suero"
  },
  order: {
    id: "2d6650ab",
    items: items,
    numberOfItems: 2,
    subTotal: 100,
    tax: 18,
    total: 118,
    status: "Pendiente",
    paymentType: "transferencia",
    deliveryDate: "5/6/2022",
    isPaid: false ,
    paidAt: "",
    transactionId: "",
  },
}


const testDataAdmin = {
  template: "admin",
  subject: "Alguien ha realizado una orden!",
  to: process.env.FROM_EMAIL,
  deliveryAddress: {
    name: "Jean",
    lastName: "Suero"
  },
  order: {
    id: "2d6650ab",
    items: items,
    numberOfItems: 2,
    subTotal: 100,
    tax: 18,
    total: 118,
    status: "Pendiente",
    paymentType: "transferencia",
    deliveryDate: "5/6/2022",
    isPaid: false ,
    paidAt: "",
    transactionId: "",
  },
}
export default function handler (req, res) {
  sendEmail(testDataUser)
  sendEmail(testDataAdmin)
}
