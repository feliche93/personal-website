import Link from "next/link";
import { getDatabase } from "../../lib/notion";
import { Text } from "./[slug].js";
import moment from 'moment';
import BlogPostGrid from "../../components/blog/BlogPostGrid";
import Layout from "../../components/layout/Layout";
import WebsiteLayout from "../../components/layout/WebsiteLayout";
import { NextSeo } from "next-seo";

export const databaseId = process.env.NOTION_DATABASE_ID;
export default function Page({ posts }) {

  const transformedPosts = posts.map(post => {

    const published = post.properties.Published.checkbox;

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
      <NextSeo
        title="Blog"
        description="Check out the latest blog posts about Web3, DEFI, Etherum and more."
      />
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className=" h-1/3 sm:h-2/3" />
        </div>
        <div className="relative bg-gray-50 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Latest Blog Posts</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Learn more about my favorite topics around Crypto, Blockchain and Data.
            </p>
          </div>
          <BlogPostGrid posts={transformedPosts} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  // TODO: Think about sorting
  const publishedPosts = database.filter(post => post.properties.Published.checkbox);

  return {
    props: {
      posts: publishedPosts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
};

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}