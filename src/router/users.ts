import express from 'express'
import { isAuthenticated, isOwner, updatedAt } from '../middlewares'
import {
  getAllUsers,
  deleteUser,
  updateUser,
  updateSchema,
  getUserProfile,
} from '../controllers/users'

export default (router: express.Router) => {
  router.get('/users', getAllUsers)
  router.get('/users/:username', getUserProfile)
  router.delete('/users/:username', deleteUser)
  router.patch('/users/:username', updateUser)
  router.get('/users/update-schema', isAuthenticated, updateSchema)
}
