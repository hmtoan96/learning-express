import express from 'express'
import { getJobs, getJobById, getJobByName, createJob } from '../db/jobs'
import mongoose from 'mongoose'

export const getAllJob = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const jobs = await getJobs()
    return res.status(200).json(jobs)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const registerJob = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { name, description, department_id } = req.body
    console.log(name, description, department_id)
    const job = await createJob({
      name,
      description,
      user: new mongoose.Types.ObjectId(department_id),
    })
    return res.status(200).json(job).end()
  } catch (err) {
    console.log(err)
  }
}
