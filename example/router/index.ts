import { homePage } from '../controllers/test'
import express from 'express'
const router = express.Router()
router.post('/test/homePage', homePage)

export default router
