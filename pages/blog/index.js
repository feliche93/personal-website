import Link from "next/link";
import { getDatabase } from "../../lib/notion";
import { Text } from "./[slug].js";
import moment from 'moment';
import BlogPostGrid from "../../components/blog/BlogPostGrid";
import Layout from "../../components/layout/Layout";
import WebsiteLayout from "../../components/layout/WebsiteLayout";
import { NextSeo } from "next-seo";
import axios from 'axios';
import fs from 'fs';

export const databaseId = process.env.NOTION_DATABASE_ID;
export default function Page({ posts }) {

  const transformedPosts = posts.map(post => {

    const published = post.properties.Published.checkbox;

    const [title] = post.properties.Name.title
    const [description] = post.properties.Description.rich_text
    const [slug] = post.properties.Slug.rich_text
    const [author] = post.properties.Author.people
    const timestamp = moment(post.last_edited_time)
    const imageUrl = post.staticImageUrl

    let transformedPost = {
      id: post.id,
      title: title.text.content,
      href: `/blog/${slug.plain_text}`,
      category: post.properties.Tags.multi_select,
      description: description.plain_text,
      date: timestamp.format('ll'),
      datetime: timestamp.format('YYYY-MM-DD'),
      imageUrl: imageUrl,
      author: author,
      readingTime: '4 min'

    }

    return transformedPost

  })

  return (
    <>
      <NextSeo
        title="Blog"
        description="Check out the latest blog posts about Web3, DEFI, Ethereum and more."
      />
      <div className="relative bg-gray-100 pt-16 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className=" h-1/3 sm:h-2/3" />
        </div>
        <div className="relative bg-gray-100 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Latest Blog Posts</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
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

  publishedPosts.forEach(page => {
    const slug = page.properties.Slug.rich_text[0].plain_text;

    fs.mkdir(`./public/blog/${slug}`, { recursive: true }, (err) => {
      if (err) throw err;
    });

    // download temporary S3 image to static folder
    axios({
      method: 'get',
      url: page.properties.Cover.files[0].file.url,
      responseType: 'stream',
    }).then(function (response) {
      const filetype = response.headers['content-type'].split('/')[1];
      response.data.pipe(
        fs.createWriteStream(`./public/blog/${slug}/${slug}.${filetype}`)
      );
    });

    const files = fs.readdirSync(`./public/blog/${slug}`);
    const [staticImageUrl] = files.filter((file) => file.includes(slug));
    // Addss image url to page object
    page['staticImageUrl'] = `/blog/${slug}/${staticImageUrl}`;
    // console.log(page);
  });

  return {
    props: {
      posts: publishedPosts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
};

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}