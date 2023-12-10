import { db } from '../libs/db'

const prisma = db

export class User {
  static async getAllUsers() {
    return prisma.user.findMany()
  }

  static async createUser(data: any) {
    return prisma.user.create({ data })
  }

  static async getUserById(id: any) {
    return prisma.user.findUnique({ where: { id } })
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

  static async getProfileByUsername(username: string) {
    return prisma.userProfile.findUnique({
      where: { userUsername: username },
    })
  }

  static async softDeleteUserByUsername(username: string) {
    return prisma.user.update({
      where: { username },
      data: { isDeleted: true, udpatedAt: new Date() },
    })
  }

  static async updateUserByUsername(username: string, data: any) {
    return prisma.user.update({
      where: { username },
      data,
    })
  }
}
