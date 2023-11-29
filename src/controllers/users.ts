import express from 'express'

import {
  UserModel,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} from '../db/users'

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const users = await getUsers()
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
    const { id } = req.params
    const deleteUser = await deleteUserById(id)
    return res.status(200).json(deleteUser)
  } catch (err) {
    return res.sendStatus(400)
  }
}

export const updateUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.sendStatus(400)
    }
    const existingUser = await getUserById(id)
    if (!existingUser) {
      return res.sendStatus(400)
    }
    const user = await updateUserById(id, req.body)
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
