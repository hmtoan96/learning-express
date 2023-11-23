import express from 'express'
import {
  getDepartments,
  getDepartmentByName,
  createDepartment,
} from '../db/departments'

export const getAllDepartment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const departments = await getDepartments()
    return res.status(200).json(departments)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const registerDepartment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.sendStatus(400)
    }
    const existingDepartment = await getDepartmentByName(name)
    if (existingDepartment) {
      return res.sendStatus(400)
    }
    const department = await createDepartment({ name })
    return res.status(200).json(department).end()
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
}
