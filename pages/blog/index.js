import Link from "next/link";
import { getDatabase } from "../../lib/notion";
import { Text } from "./[slug].js";
import moment from 'moment';

export const databaseId = process.env.NOTION_DATABASE_ID


export default function Home({ posts }) {

    const transformedPosts = posts.map(post => {
        const [title] = post.properties.Name.title
        const [description] = post.properties.Description.rich_text
        const [slug] = post.properties.Slug.rich_text
        const [author] = post.properties.Author.people
        const timestamp = moment(post.last_edited_time)
        const [file] = post.properties.Cover.files

        let transformedPost = {
            id: post.id,
            title: title.text.content,
            href: `/blog/${slug.plain_text}`,
            category: post.properties.Tags.multi_select,
            description: description.plain_text,
            date: timestamp.format('ll'),
            datetime: timestamp.format('YYYY-MM-DD'),
            imageUrl: file.file.url,
            author: author,
            readingTime: '4 min'

        }

        return transformedPost
    })

    console.log(transformedPosts)

    return (
        <>
            <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                <div className="absolute inset-0">
                    <div className="bg-white h-1/3 sm:h-2/3" />
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">From the blog</h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
                        </p>
                    </div>
                    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                        {transformedPosts.map((post) => (
                            <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
                                </div>
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-600">
                                            { post.category.map((category) => (
                                                <a key={category.id} href={`/blog/tag/${category.name.toLowerCase()}`} className="hover:underline">
                                                    {category.name}
                                                </a>
                                            ))}
                                        </p>
                                        <a href={post.href} className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{post.description}</p>
                                        </a>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <a href={post.author.href}>
                                                <span className="sr-only">{post.author.name}</span>
                                                <img className="h-10 w-10 rounded-full" src={post.author.avatar_url} alt={post.author.name} />
                                            </a>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                <a href={post.author.href} className="hover:underline">
                                                    {post.author.name}
                                                </a>
                                            </p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
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
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export const getStaticProps = async () => {
    const database = await getDatabase(databaseId);

    return {
        props: {
            posts: database,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 1, // In seconds
    };
};