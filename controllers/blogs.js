const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/',async (request, response) => {
	const blog = new Blog(request.body)
	const savedBlog =await blog.save()
	response.status(201).json(savedBlog)
})
blogRouter.put('/:id',async (request, response) => {
	let id=request.params.id
	const blog = request.body
	const updatedBlog = await Blog.findByIdAndUpdate(id,blog,{ new:true, runValidators: true, context: 'query' })
	response.json(updatedBlog)
})
blogRouter.delete('/:id',async (request, response) => {
	let id=request.params.id
	await Blog.findByIdAndRemove(id)
	response.status(204).end()
})
module.exports =blogRouter