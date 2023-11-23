import express from 'express'
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
} from '../db/users'
import { authentication, random } from '../helpers'

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body
    console.log(password)
    if (!email || !password || !username) {
      return res.sendStatus(400)
    }
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return res.sendStatus(400)
    }
    const salt = random()
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        sessionToken: '4@dmiN0nly',
        password,
      },
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
    // const user = await getUserByEmail(email).select(
    //   'authentication.salt + authentication.password',
    // )
    // if (!user) {
    //   return res.sendStatus(400)
    // }

    // const expectedHash = authentication(user.authentication.salt, password)
    // if (user.authentication.password !== expectedHash) {
    //   return res.sendStatus(403)
    // }
    // const salt = random()
    // user.authentication.sessionToken = authentication(salt, user._id.toString())
    // await user.save()

    const user = await getUserByEmail(email).select('authentication.password')
    user.authentication.sessionToken = '4@dmiN0nly'
    if (!user) {
      return res.sendStatus(400)
    }
    // res.cookie('UACv-AUTH', user.authentication.sessionToken, {
    //   domain: 'localhost',
    //   path: '/',
    // })
    res.cookie('UACv-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    })
    if (user.authentication.password !== password) {
      return res.sendStatus(403)
    }
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
    user.authentication = {
      ...user.authentication,
      password: authentication(user.authentication.salt, '123123'),
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
