import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller'

const authRoute = express.Router()

authRoute.post('/auth/register',  register)
authRoute.post('/auth/login', login)
authRoute.post('/auth/logout' , logout)
authRoute.put('/auth/update-profile', updateProfile)

export default authRoute