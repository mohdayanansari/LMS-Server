import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config' //! --> "DO NOT EDIT"
import express, { Application, Express, Request, Response } from 'express'
import methodOverride from 'method-override'
import morgan from 'morgan'
import path from 'path'

// Import Libraries -->
const app: Application = express()

// Import Configs -->
import corsOptions from './configs/corsOptions'

// Import Custom Middlewares -->
import errorHandler from './middlewares/errorHandler'
import { logger } from './middlewares/logger'

//?###Configure__Middleware###
// <==SWAGGER CONFIGURATION==>
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//--Logging_Middleware- morgan middleware--
app.use(morgan('tiny'))
app.use(logger)

// <--CORS-->
app.use(cors(corsOptions))
app.use(methodOverride('_method'))
//! regular/built-in middleware
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//! cookies middleware ##third-party middleware###
app.use(cookieParser())

const { API_VERSION } = process.env

//?Import Routes from route folder-->
import { root } from './routes'
//? Router Middleware -->
app.use('/', root)

// # ***********__handling 404 routes__************* #
app.all('*', (req: Request, res: Response) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({
      success: false,
      message: '404 Not Found! ss',
    })
  } else {
    res.type('txt').send('404 Not Found!')
  }
})

// error handling middleware--->
app.use(errorHandler)

export default app
