import mongoose, { mongo } from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, require: true },
  department: { type: String, required: true, default: '' },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  verificationEmail: { type: Boolean, required: false, default: false },
  verificationEmailToken: { type: String, required: false, default: null },
  verificationEmailTokenExpiresAt: {
    type: Date,
    require: false,
    default: null,
  },
  verificationResetPassword: { type: Boolean, required: false, default: false },
  verificationResetPasswordToken: {
    type: String,
    required: false,
    default: null,
  },
  verificationResetPasswordExpiresAt: {
    type: Date,
    require: false,
    default: null,
  },
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: String) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken })
export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ _id: id }, { $set: values }, { new: true })
