import crypto from 'crypto'

const SECRET = 'UAC-REST-API'
export const random = () => crypto.randomBytes(128).toString('base64')
export const authentication = (password: string) => {
  return crypto.createHmac('sha256', password).update(SECRET).digest('hex')
}
