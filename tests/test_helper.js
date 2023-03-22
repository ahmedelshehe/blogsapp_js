const Blog = require('../models/Blog')
const initialBlogs=[
	{
		title: 'Test Title 1',
		author: 'TEst Author 1',
		url: 'www.test1.com',
		likes: 45
	},
	{
		title: 'Test Title 2',
		author: 'TEst Author 2',
		url: 'www.test2.com',
		likes: 55
	}
]
const singleBlog={
	title:'New Blog Title',
	author:'Super Test Agent',
	url: 'www.test2.com',
	likes: 55
}
const blogWithNoLikes={
	title: 'No Likes blog',
	author: 'No Likes author',
	url: 'www.nolikes.com'
}
const blogWithNoTitle={
	author :'No Title author',
	url: 'http://notitle.com',
	likes: 4
}
const blogWithNoUrl={
	title: 'No url blog',
	author :'No Url author',
	likes: 6
}
const blogsInDb=async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}
module.exports = {
	initialBlogs,
	blogsInDb,
	blogWithNoLikes,
	singleBlog,
	blogWithNoTitle,
	blogWithNoUrl
}