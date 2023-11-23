import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: false,
    },
    description: { type: String, required: true },
  },
  { timestamps: true },
)

export const JobModel = mongoose.model('Job', JobSchema)

export const getJobs = () => JobModel.find().populate('user')
export const getJobById = (id: string) => JobModel.findById(id).populate('user')
export const getJobByName = (name: string) => JobModel.findOne({ name })
export const createJob = (values: Record<string, any>) =>
  new JobModel(values).save().then((job) => job.toObject())
