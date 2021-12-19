import { Fragment } from 'react';
import { getDatabase, getPage, getBlocks } from '../../lib/notion';
import { databaseId } from './index.js';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import WebsiteLayout from '../../components/layout/WebsiteLayout';
import moment from 'moment';
import Basic from '../../components/blog/BasicCode';
import Tweet from '../../components/blog/Tweet';
import { getTweets } from '../../lib/twitter';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import fs from 'fs';

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? 'font-bold	text-gray-900' : '',
          code ? 'bg-gray-200 p-1 text-blue-700 font-mono text-sm' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <Text text={value.text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <Text text={value.text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <Text text={value.text} />
        </h3>
      );
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.text} />
        </li>
      );
    case 'bulleted_list_item':
      return (
        <li>
          <Text text={value.text} />
        </li>
      );
    case 'to_do':
      return (
        <div className='py-0.5'>
          <label htmlFor={id}>
            <input
              className=' focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
              type='checkbox'
              id={id}
              defaultChecked={value.checked}
            />{' '}
            <Text text={value.text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value?.caption;
      // const caption = value?.caption[0] !== 'undefined' ? value.caption[0].plain_text : 'undefined';
      return (
        <>
          <figure
            className='relative aspect-video m-0'
          >
            <Image
              className='object-contain'
              // width={1200}
              // height={400}
              layout='fill'
              src={src}
              alt={caption}
            />
          </figure>
          {caption && (
            <div>
              <figcaption>{caption}</figcaption>
            </div>
          )}
        </>
      );
    case 'quote':
      // console.log(value);
      return (
        <blockquote>
          <p>
            <Text text={value.text} />
          </p>
        </blockquote>
      );
    case 'callout':
      // console.log(value);
      const icon = value.icon.emoji;
      return (
        <div className='bg-gray-200 text-gray-900 rounded-lg p-3'>
          <div className='flex justify-start'>
            <div className='text-2xl'>{icon}</div>
            <div className='ml-2'>
              <Text text={value.text} />
            </div>
          </div>
        </div>
      );
    case 'code':
      return (
        <Basic code={value.text[0].plain_text} language={value.language} />
      );
    case 'embed':
      // Tweet Embedding
      if (value?.tweet !== 'undefined') {
        return <Tweet {...value.tweet} />;
      }

    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type
        })`;
  }
};

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />;
  }
  console.log(page.staticImageUrl);
  return (
    <>
      <NextSeo
        title={page.properties.Name.title[0].plain_text}
        description={page.properties.Description.rich_text[0].plain_text}
        openGraph={{
          title: page.properties.Name.title[0].plain_text,
          description: page.properties.Description.rich_text[0].plain_text,
          url: `https://www.cryptoneur.xyz/blog/${page.properties.Slug.rich_text[0].plain_text}`,
          images: [
            {
              url: `https://www.cryptoneur.xyz${page.staticImageUrl}`,
              alt: page.properties.Cover.files[0].name.split('.')[0],
            },
          ],
          type: 'article',
          article: {
            publishedTime: page.created_time,
            modifiedTime: page.last_edited_time,
            authors: [page.properties.Author.people[0].name],
            tags: [page.properties.Tags.multi_select[0].name],
          },
        }}
      />

      <article className='sm:mx-auto mx-4 bg-gray-50'>
        <div className='flex justify-center items-center'>
          <Image
            src={page.staticImageUrl}
            width={640}
            height={400}
            className='object-contain rounded-xl'
            priority={true}
            slug={page.properties.Slug.rich_text[0].plain_text}
            alt={page.properties.Cover.files[0].name.split('.')[0]}
          />
        </div>
        <h1 className='mt-2 block text-4xl py-8 text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:max-w-3xl sm:mx-auto mx-4'>
          {page.properties.Name.title[0].plain_text}
        </h1>
        <div className='flex items-center justify-center group pb-6'>
          <Image
            width={80}
            height={80}
            className='object-contain rounded-full'
            src={page.properties.Author.people[0].avatar_url}
            alt={page.properties.Author.people[0].name}
          />
          <div className='ml-3'>
            <div className='block text-xl font-medium text-gray-700'>
              {page.properties.Author.people[0].name}
            </div>
            <div className='block text-base font-medium text-gray-500'>
              {moment(page.last_edited_time).format('ll')}
            </div>
          </div>
        </div>
        <section className='prose prose-blue prose-lg text-gray-500 sm:mx-auto mx-4 bg-gray-50'>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>
    </>
  );
}

export const getStaticPaths = async () => {
  let database = await getDatabase(databaseId);

  // TODO: Think about sorting
  const posts = database.filter((post) => post.properties.Published.checkbox);

  const slugs = posts.map((page) => {
    const [rich_text] = page.properties.Slug.rich_text;
    const slug = rich_text.plain_text;

    return {
      params: {
        slug: slug,
        id: page.id,
      },
    };
  });

  return {
    paths: slugs,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const { page, pageId } = await getPage(slug, databaseId);
  const blocks = await getBlocks(pageId);

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

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = await Promise.all(
    blocks.map(async (block) => {
      // Add child blocks if the block should contain children but none exists
      if (block.has_children && !block[block.type].children) {
        block[block.type]['children'] = childBlocks.find(
          (x) => x.id === block.id
        )?.children;
      }

      if (
        block.type === 'embed' &&
        block.embed.url.includes('https://twitter.com/')
      ) {
        // https://www.youtube.com/watch?v=xZ9OzPQORtw
        const elements = block.embed.url.split('/');
        const elementLength = elements.length;
        let tweetId = elements[elementLength - 1];
        tweetId = tweetId.split('?')[0];

        const tweets = await getTweets([tweetId]);
        block.embed['tweet'] = tweets[0];
        // console.log(tweets);
      }

      if (
        block.type === 'image'
      ) {

        const captions = block.image.caption.map((caption) => {
          return caption.plain_text;
        });

        block.image.caption = captions.join(' ');
        const fileName = block.image.caption.replace(/\s+/g, '-')

        // download temporary S3 image to static folder
        await axios({
          method: 'get',
          url: block.image.file.url,
          responseType: 'stream',
        }).then(function (response) {
          const filetype = response.headers['content-type'].split('/')[1];
          fs.mkdir(`./public/blog/${slug}`, { recursive: true }, (err) => {
            if (err) throw err;
          });
          response.data.pipe(
            fs.createWriteStream(`./public/blog/${slug}/${fileName}.${filetype}`)
          );


          const files = fs.readdirSync(`./public/blog/${slug}`);
          const [staticImageUrl] = files.filter((file) => file.includes(fileName));
          // Addss image url to page object
          block.image.file.url = `/blog/${slug}/${staticImageUrl}`;
          console.log(block.image.file.url);
        });
      }
      return block;
    })
  );

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    // revalidate: 60,
  };
};

Post.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  );
};
