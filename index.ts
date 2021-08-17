import dotenv from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import Helmet from 'helmet'
import morgan from 'morgan'
import userRoute from './routes/users'
import authRoute from './routes/auth'
import postRoute from './routes/posts'
import { intro } from './public/intro'

dotenv.config()
const app = express()
const port: string | number = process.env.PORT || 4500

connect(`${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('🎫 [db]: connected...'))
  .catch((err: any) => console.log('db error', err))

// Middleware
app.use(express.json())
app.use(Helmet())
app.use(morgan('common'))

// Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.get('/', (req, res) => res.send(intro))
app.listen(port, () => console.log(`⚡ [server]: running @ http://localhost:${port}`))
