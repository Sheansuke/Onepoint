const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suerojean@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./utils/sendEmail/'),
    defaultLayout: false
  },
  viewPath: path.resolve('./utils/sendEmail/')
}

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

const mailOptions = ({ template, to, subject, deliveryAddress, order }) => {
  if (template === 'user')
    return {
      from: `"Onepoint" <${process.env.FROM_EMAIL}>`, // sender address
      to: to, // list of receivers
      subject: subject,
      template: 'user', // the name of the template file i.e email.handlebars
      context: {
        name: `${deliveryAddress?.name} ${deliveryAddress?.lastName}`, // replace {{name}} with Adebola
        companyName: process.env.COMPANY_NAME, // replace {{company}} with My Company
        order: {
          id: order?.id,
          items: order?.items,
          numberOfItems: order?.numberOfItems,
          subTotal: order?.subTotal,
          tax: order?.tax,
          total: order?.total,
          status: order?.status,
          paymentType: order?.paymentType,
          deliveryDate: order?.deliveryDate,
          isPaid: order?.isPaid ? 'Si' : 'No',
          paidAt: order?.paidAt || 'Aun no pagado',
          transactionId: order?.transactionId || 'Sin transferencia realizada'
        }
      }
    }

    // FOR ADMIN
  return {
    from: `"Onepoint" <${process.env.FROM_EMAIL}>`, // sender address
    to: to, // list of receivers
    subject: subject,
    template: 'admin', // the name of the template file i.e email.handlebars
    context: {
      name: `${deliveryAddress?.name} ${deliveryAddress?.lastName}`, // replace {{name}} with Adebola
      order: {
        id: order?.id,
        items: order?.items,
        numberOfItems: order?.numberOfItems,
        subTotal: order?.subTotal,
        tax: order?.tax,
        total: order?.total,
        status: order?.status,
        paymentType: order?.paymentType,
        deliveryDate: order?.deliveryDate,
        isPaid: order?.isPaid ? 'Si' : 'No',
        paidAt: order?.paidAt || 'Aun no pagado',
        transactionId: order?.transactionId || 'Sin transferencia realizada'
      }
    }
  }
}

// trigger the sending of the E-mail
export const sendEmail = ({
  /** user or admin */
  template,
  subject,
  to,
  deliveryAddress,
  order
}) => {
  const options = mailOptions({
    template: template,
    subject: subject,
    to: to,
    deliveryAddress: deliveryAddress,
    order: order
  })
  transporter.sendMail(options, function (error, info) {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: ' + info.response)
  })
}
