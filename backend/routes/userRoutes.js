import express from 'express'
import {getUserProfile, loginUser, registerUser} from '../controllers/userController.js'
const userRoutes = express.Router()
import {protect} from '../middleware/authMiddleware.js'

userRoutes.post("/register",registerUser)
userRoutes.post("/login",loginUser)
userRoutes.get('/profile',protect,getUserProfile)

export default userRoutes;