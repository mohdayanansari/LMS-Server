import express, { Request, Response } from 'express'
import path from 'path'

const router = express.Router()

router.get('^/$|/index(.html)?', (req: Request, res: Response): void => {
  res.status(200).sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

export default router
