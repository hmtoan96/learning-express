import { db } from '../libs/db'

const prisma = db

export class User {
  static async getAllUsers() {
    return prisma.user.findMany()
  }

  static async createUser(data: any) {
    return prisma.user.create({ data })
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  static async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    })
  }
}
