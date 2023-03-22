const listHelper = require('../utils/list_helper')
const listWithNoBlogs=[]
const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]
const multipleBlogs=[
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
	},
	{
		title: 'Test Title 3',
		author: 'TEst Author 3',
		url: 'www.test3.com',
		likes: 50
	},
	{
		title: 'Test Title 3',
		author: 'TEst Author 3',
		url: 'www.test3.com',
		likes: 50
	}
]
describe('total likes', () => {

	test('when list has no  blogs, equals  0', () => {
		const result = listHelper.totalLikes(listWithNoBlogs)
		expect(result).toBe(0)
	})

	test('when list has only one blog, equals the likes of that blog', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('when list has multiple blogs, equals the total likes of all blogs',() => {
		expect(listHelper.totalLikes(multipleBlogs)).toBe(200)
	})
})
describe('Most Liked Blog',() => {
	test('when list has only one blog,return the blog', () => {
		const result = listHelper.mostLiked(listWithOneBlog)
		expect(result).toEqual(listWithOneBlog[0])
	})
	test('When List has multiple blogs , it return the blog with most likes', () => {
		const result =listHelper.mostLiked(multipleBlogs)
		expect(result).toEqual({
			'title': 'Test Title 2',
			'author': 'TEst Author 2',
			'url': 'www.test2.com',
			likes: 55
		})
	})
})
describe('Author with most blogs',() => {
	test('should return a message with not existing blogs when passed an empty list of blogs',() => {
		const result =listHelper.mostBlogs(listWithNoBlogs)
		expect(result).toBe('No Blogs Yet')
	})
	test('when list has only one blog, equals an object with author and blog with value 1 ',() => {
		const result =listHelper.mostBlogs(listWithOneBlog)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra',blogs:1 })
	})
	test('When List has multiple blogs , it should return the most frequent author and the number of his/her blogs',() => {
		const result =listHelper.mostBlogs(multipleBlogs)
		expect(result).toEqual({ author: 'TEst Author 3',blogs:2 })
	})
})
describe('Author with most likes', () => {
	test('should return a message with not existing blogs when passed an empty list of blogs',() => {
		const result =listHelper.mostLikes(listWithNoBlogs)
		expect(result).toBe('No Blogs Yet')
	})
	test('when list has only one blog, equals an object with author and the likes of the blog ',() => {
		const result =listHelper.mostLikes(listWithOneBlog)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra',likes:5 })
	})
	test('When List has multiple blogs , it should return the  author  with most likes and the total number of likes',() => {
		const result =listHelper.mostLikes(multipleBlogs)
		expect(result).toEqual({ author: 'TEst Author 3',likes: 100 })
	})
})

