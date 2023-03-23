const blogRouter = require('express').Router()
const blogModel = require('../models/Blog')
const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
blogRouter.get('/', async (request, response) => {
	const blogs = await blogModel.find({}).populate('user',{ username: 1 ,name: 1 })
	response.json(blogs)
})

blogRouter.post('/',async (request, response) => {
	const { title,author,url,likes } = request.body
	const decodeToken =jwt.verify(request.token,process.env.SECRET)
	if(!decodeToken.id){
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await userModel.findById(decodeToken.id)
	const blog = new blogModel({
		title,author,url,likes,
		user : user.id
	})
	const savedBlog =await blog.save()
	response.status(201).json(savedBlog)
})
blogRouter.put('/:id',async (request, response) => {
	let id=request.params.id
	const blog = request.body
	const decodeToken =jwt.verify(request.token,process.env.SECRET)
	if(!decodeToken.id){
		return response.status(401).json({ error: 'token invalid' })
	}
	const oldBlog =await blogModel.findById(id)
	if(!(decodeToken.id === oldBlog.user.toString())){
		return response.status(401).json({ error: 'the user is not the creator of the blog' })
	}
	const updatedBlog = await blogModel.findByIdAndUpdate(id,blog,{ new:true, runValidators: true, context: 'query' })
	response.json(updatedBlog)
})
blogRouter.delete('/:id',async (request, response) => {
	let id=request.params.id
	const decodeToken =jwt.verify(request.token,process.env.SECRET)
	if(!decodeToken.id){
		return response.status(401).json({ error: 'token invalid' })
	}
	const blog =await blogModel.findById(id)
	if(!(decodeToken.id === blog.user.toString())){
		return response.status(401).json({ error: 'the user is not the creator of the blog' })
	}
	await blog.delete()
	response.status(204).end()
})
module.exports =blogRouter