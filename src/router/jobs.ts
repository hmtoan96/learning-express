import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'
import { getAllJob, registerJob } from '../controllers/jobs'

export default (router: express.Router) => {
  router.get('/jobs', isAuthenticated, getAllJob)
  router.post('/jobs', isAuthenticated, registerJob)
}
