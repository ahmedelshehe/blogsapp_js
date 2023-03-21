const totalLikes =(blogs)=>{
    return blogs.reduce((total, value) => {
        return total + value.likes;
      }, 0);
}
const mostLiked =(blogs)=>{
    return blogs.reduce((a,b)=>{
        return (b.likes > a.likes) ? b :a
    })
}
const mostBlogs =(blogs)=>{
    if(blogs.length > 0){
        const counter={}
        blogs.map((blog)=>{
            counter[blog.author] = counter[blog.author] + 1 || 1;
        })
        let authors =Object.keys(counter);
        let numBlogs=Object.values(counter);
        let mostOccuredIndex=numBlogs.indexOf(numBlogs.reduce((a,b)=>a >b ?a :b))
        return {author : authors[mostOccuredIndex],blogs:numBlogs[mostOccuredIndex]}  
    }else {
        return "No Blogs Yet"
    }
}
const mostLikes=(blogs)=>{
    if(blogs.length > 0) {
        const counter={}
        blogs.map((blog)=>{
            counter[blog.author] = counter[blog.author] + blog.likes || blog.likes
        })
        const likesArray = Object.keys(counter).map((key)=> {return {author :key,likes:counter[key]}} )
        return likesArray.reduce((a,b)=> b.likes>a.likes ? b :a)
    }else {
        return "No Blogs Yet"
    }
}
module.exports = {
totalLikes,
mostLiked,
mostBlogs,
mostLikes
}