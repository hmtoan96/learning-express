import mongoose from 'mongoose'

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: false },
})

export const DepartmentModel = mongoose.model('Department', DepartmentSchema)

export const getDepartments = () => DepartmentModel.find()
export const getDepartmentById = (id: string) => DepartmentModel.findById(id)
export const getDepartmentByName = (name: string) =>
  DepartmentModel.findOne({ name })
export const createDepartment = (values: Record<string, any>) =>
  new DepartmentModel(values).save().then((user) => user.toObject())
