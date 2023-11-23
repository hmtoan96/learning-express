import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'
import {
  registerDepartment,
  getAllDepartment,
} from '../controllers/departments'

export default (router: express.Router) => {
  router.get('/departments', isAuthenticated, getAllDepartment)
  router.post('/departments', isAuthenticated, registerDepartment)
}
