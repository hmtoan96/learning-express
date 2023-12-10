import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'

const app = express()
const port = 3000
app.use(
  cors({
    credentials: true,
  }),
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

const MONGO_URL =
  'mongodb+srv://admin:4%40dmin0nly@cluster0.y9d9224.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())
