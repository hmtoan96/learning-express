import express from 'express'
import authentication from './authentication'
import users from './users'
import departments from './departments'
import jobs from './jobs'

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  users(router)
  departments(router)
  jobs(router)
  return router
}
