import express from 'express'
import * as z from 'zod'
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
} from '../db/users'
import { User } from '../models/users'

import { authentication, random } from '../helpers'

const userSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  name: z.string(),
  email: z.string().min(1, 'Email is required').email('Invalid Email'),
  password: z.string().min(1, 'Password is required'),
})

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, name } = userSchema.parse(req.body)

    if (!email || !password || !username) {
      return res.sendStatus(400)
    }

    const existingUserByEmail = await User.getUserByEmail(email)
    if (existingUserByEmail) {
      return res.sendStatus(400)
    }

    const existingUserByUsername = await User.getUserByUsername(username)
    if (existingUserByUsername) {
      return res.sendStatus(400)
    }

    const hashedPassword = authentication(password)
    const user = await User.createUser({
      email,
      name,
      username,
      password: hashedPassword,
    })
    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.sendStatus(400)
    }
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password',
    )
    if (!user) {
      return res.status(400).send('Không có user!')
    }
    const expectedHash = authentication(password)
    if (user.authentication.password != expectedHash) {
      return res.status(403).send('Tài khoản hoặc mật khẩu không đúng')
    }

    const salt = random()
    user.authentication.sessionToken = authentication(user._id.toString())
    await user.save()
    res.cookie('uacv-auth', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    })
    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const reset = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.sendStatus(400)
    }
    const user = await getUserById(id)
    if (!user) {
      return res.sendStatus(400)
    }
    await user.save()
    return res.status(200).json(user).end()
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.sendStatus(404)
    }
  } catch (err) {}
}
