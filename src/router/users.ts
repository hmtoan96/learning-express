import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'
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
  router.delete('/users/:username', isAuthenticated, isOwner, deleteUser)
  router.patch('/users/:username', isAuthenticated, isOwner, updateUser)
  router.get('/users/update-schema', isAuthenticated, updateSchema)
}
