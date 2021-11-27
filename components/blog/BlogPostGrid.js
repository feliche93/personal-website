import React from 'react'
import BlogPostCard from "../../components/blog/BlogPostCard";

function BlogPostGrid({posts}) {
    return (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
        ))}
    </div>
    )
}

export default BlogPostGrid
