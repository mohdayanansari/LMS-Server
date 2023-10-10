import { format } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'

// handling filesystem of logs
const logEvents = async (
  message: string,
  logFileName: string
): Promise<void> => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    )
  } catch (error) {
    console.error('Error in logger.js', error)
  }
}

// middleware function
const logger = (req: Request, res: Response, next: NextFunction): void => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, `reqLog.log`)
  next()
}

export { logEvents, logger }
