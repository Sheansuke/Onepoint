import { findUniqueUserByClerkId } from '../api/database/user'
import { IUserModel } from '../interfaces/models/IUserModel'

export const isUserAdmin = async (userId: string) => {
  const user = (await findUniqueUserByClerkId(userId)) as IUserModel
  return user.role.name == 'admin' ? true : false
}
