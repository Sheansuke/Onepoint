import { IOrderModel } from '../models/IOrderModel';
export interface IEmailOptions<T> {
  from: string // sender address
  to: string // list of receivers
  subject: string,
  template: 'user' | 'admin' // the name of the template file i.e email.handlebars
  context: T
}

export type EmailContextTypeUser = {
  name: string
  companyName: string
  order: IOrderModel
}
export type EmailContextTypeAdmin = {}