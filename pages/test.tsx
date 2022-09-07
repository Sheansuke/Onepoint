import axios from 'axios'

// const sendEmail = () => {
//   axios.post('/.netlify/functions/send-email')
// }
const sendEmail = () => {
  axios.post('/.netlify/functions/send-email', {
    id: "order?.id",
    items: ["order?.items","order?.items"],
    numberOfItems: "order?.numberOfItems",
    subTotal: "order?.subTotal",
    tax: "order?.tax",
    total: "order?.total",
    status: "order?.status",
    paymentType: "order?.paymentType",
    deliveryDate: {},
    isPaid: "order?.isPaid" ? 'Si' : 'No',
    paidAt: "order?.paidAt" || 'Aun no pagado',
    transactionId: "order?.transactionId" || 'Sin transferencia realizada'
  })
}

const ComponentName = () => {
  return (
    <button className="btn btn-primary" onClick={sendEmail}>
      Hook Typescript
    </button>
  )
}

export default ComponentName
