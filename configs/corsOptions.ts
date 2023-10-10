import allowedOrigins from './allowedOrigins'

//# !origin is only for testing the api in postman or if it using in the desktop app or mobile app
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //--> || !origin
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS!'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 204,
}

export default corsOptions
