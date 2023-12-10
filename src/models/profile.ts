import { db } from '../libs/db'

const prisma = db

export class UserProfile {
  static async getProfileByUsername(username: string) {
    return prisma.userProfile.findUnique({
      where: { userUsername: username },
    })
  }
}
