const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const helper=require('./test_helper')
const api =supertest(app)
const User = require('../models/User')
const Blog=require('../models/Blog')
const bcrypt = require('bcrypt')

let token
describe('Blogs Api Suite',() => {
	beforeAll(async () => {
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })
		await user.save()
		
		const loggedInUser = await api.post('/api/login')
			.send({username:'root',password : 'sekret'})
		
		token =`Bearer ${loggedInUser.body.token}`
	})
	beforeEach(async () => {
		await Blog.deleteMany({})
		const blogObjects=helper.initialBlogs.map(blog => new Blog(blog))
		const promiseArray =blogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)
	})
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
	test('all blogs are returned', async () => {
		const response =await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})
	test('a specific blog is returned', async () => {
		const response =await api.get('/api/blogs')
		const titles=response.body.map(blog => blog.title)
		expect(titles).toContain('Test Title 1')
	})
	test('a valid blog can be created', async() => {
		await api.post('/api/blogs').send(helper.singleBlog).set('Authorization', token).expect(201).expect('Content-Type', /application\/json/)
		const blogsAtEnd=await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
		const titles=blogsAtEnd.map(blog => blog.title)
		expect(titles).toContain(helper.singleBlog.title)
	})
	test('verifies that each blog has a unique identifier withe name id',async () => {
		const blogs = await helper.blogsInDb()
		blogs.forEach(blog => expect(blog.id).toBeDefined())

	})
	test('verifies that a blog created with no likes value , the likes value will default to 0', async () => {
		const response =await api.post('/api/blogs').set('Authorization', token).send(helper.blogWithNoLikes)
		expect(response.body.likes).toEqual(0)
	})
	test('verifies that a blog created with no title or url value , the response status code will be 400', async () => {
		await api.post('/api/blogs').send(helper.blogWithNoTitle).expect(400)
		await api.post('/api/blogs').send(helper.blogWithNoUrl).expect(400)
	})
	test('verifies that a blog can be updated',async () => {
		const response = await api.post('/api/blogs').send(helper.singleBlog).set('Authorization', token)
		const updatedBlog = await api.put('/api/blogs/'+response.body.id).send({ title: 'updated title' }).set('Authorization', token)
		expect(updatedBlog.body.title).toBe('updated title')
	})
	test('verifies that a blog can be deleted',async () => {
		const response = await api.post('/api/blogs').set('Authorization', token).send(helper.singleBlog)
		const initialBlogs =await helper.blogsInDb()
		await api.delete('/api/blogs/'+response.body.id).set('Authorization', token).send({ title: 'updated title' }).expect(204)
		const endBlogs =await helper.blogsInDb()
		expect(endBlogs.length).toBe(initialBlogs.length -1)
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})
})
