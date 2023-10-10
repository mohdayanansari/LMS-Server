import { NextFunction, Request, Response } from 'express'
import { logEvents } from './logger'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  )
  console.error(err.stack)

  const status = res.statusCode ? res.statusCode : 500 // server error

  res.status(status)

  res.json({
    success: false,
    message: err.message,
  })
}

export default errorHandler
