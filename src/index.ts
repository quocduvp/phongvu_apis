require('dotenv').config();
import express from 'express'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import cors from 'cors'
import logger from 'morgan'
import compression from 'compression'
import { categoryRouter, productRouter, uploadRouter } from './routers'

const app = express()
app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(flash())
app.use(cors())

app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/upload", uploadRouter)
app.listen(process.env.PORT || 3333)
export { app }

// redis
export { redis,pub,sub } from './config/redis.config'
export { mongoose } from './config/mongoose.config'