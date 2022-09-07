const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  // Parse the JSON text received.
  const { template, subject, to, deliveryAddress, order } = JSON.parse(event?.body)

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'suerojean@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve('./netlify/functions/send-email'),
      defaultLayout: false
    },
    viewPath: path.resolve('./netlify/functions/send-email')
  }

  // use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions))

  // MAIL OPTIONS
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
  const options = mailOptions({
    template: template,
    subject: subject,
    to: to,
    deliveryAddress: deliveryAddress,
    order: order
  })

  
  try {
    // transporter.sendMail(options)
    transporter.sendMail(options)
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: 'success'
      })}
    
  } catch (error) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        result: 'error'
      })}
  }
 
}

module.exports = { handler }
