import express from 'express'

import {
  UserModel,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} from '../db/users'

import { User } from '../models/users'

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const users = await User.getAllUsers()
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { username } = req.params
    const existingUser = await User.getUserByUsername(username)
    if (!existingUser) {
      return res.sendStatus(404)
    }
    const deleteUser = await User.softDeleteUserByUsername(username)
    if (!deleteUser) {
      return res.sendStatus(404)
    }
    return res.status(200).json(deleteUser).end()
  } catch (err) {
    return res.sendStatus(400)
  }
}

export const updateUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { username } = req.params
    if (!username) {
      return res.sendStatus(400)
    }
    const existingUser = await User.getUserByUsername(username)
    if (!existingUser) {
      return res.sendStatus(400)
    }
    const user = await User.updateUserByUsername(username, req.body)
    return res.status(200).json(user).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const updateSchema = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    UserModel.updateMany(
      {},
      {
        department: 'IT',
      },
    )
      .then(() => {
        console.log('Cập nhật thành công')
        return res.status(200).end()
      })
      .catch((err) => {
        console.log('Lỗi khi cập nhật: ', err)
        return res.sendStatus(400)
      })
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const getUserProfile = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { username } = req.params
    const existingUser = await User.getUserByUsername(username)
    if (!existingUser) {
      return res.sendStatus(400)
    }
    const userProfile = await User.getProfileByUsername(username)
    if (!userProfile) {
      return res.sendStatus(400)
    }
    return res.status(200).json(userProfile).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
