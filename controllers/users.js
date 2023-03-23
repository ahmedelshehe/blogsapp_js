const usersRouter =require('express').Router()

const userModel = require('../models/User')
const bcrypt = require('bcrypt')
usersRouter.get('/', async (request,response) => {
	const users =await userModel.find({}).populate('blogs',{ url: 1 ,title: 1,author:1 })
	response.json(users)
})

usersRouter.post('/',async (request,response) => {
	const { username,name,password } = request.body
	if(password.length < 3 ) {
		return response.status(400).json({
			error: 'password must be at least 3 characters'
		})
	}
	const saltRounds = 10
	const passwordHash=await bcrypt.hash(password,saltRounds)
	const user =new userModel({
		username,
		name,
		passwordHash
	})
	const savedUser= await user.save()
	response.status(201).json(savedUser)
})
module.exports =usersRouter