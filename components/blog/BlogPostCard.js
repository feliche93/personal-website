import React from 'react'
import Image from 'next/image';

function BlogPostCard({ post }) {
    return (
        <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
                <div className="relative aspect-video">
                    <Image
                        layout='fill'
                        className="h-48 w-full object-cover"
                        src={post.imageUrl} alt="" />
                </div>
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600">
                        {post.category.map((category) => (
                            <a key={category.id} href={`/blog/tag/${category.name.toLowerCase()}`} className="hover:underline">
                                {category.name}
                            </a>
                        ))}
                    </p>
                    <a href={post.href} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                        <p className="mt-3 text-base text-gray-600">{post.description}</p>
                    </a>
                </div>
                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <a href={post.author.href}>
                            <span className="sr-only">{post.author.name}</span>
                            <Image width={60} height={60} className="object-contain rounded-full" src={post.author.avatar_url} alt={post.author.name} />
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            <a href={post.author.href} className="hover:underline">
                                {post.author.name}
                            </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-600">
                            <time dateTime={post.datetime}>{post.date}</time>
                            {/*
                        TODO: Add reading time
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readingTime} read</span>
                        */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostCard
