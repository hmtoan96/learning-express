import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'
import {
  getAllUsers,
  deleteUser,
  updateUser,
  updateSchema,
} from '../controllers/users'

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers)
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
  router.get('/users/update-schema', isAuthenticated, updateSchema)
}
