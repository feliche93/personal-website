import { getServerSideSitemap } from 'next-sitemap'
import { getDatabase } from "../../lib/notion";
import moment from 'moment';


export const databaseId = process.env.NOTION_DATABASE_ID;

export const getServerSideProps = async (ctx) => {

    const database = await getDatabase(databaseId);
    const publishedPosts = database.filter(post => post.properties.Published.checkbox);

    const posts = publishedPosts.map(post => {

      const [slug] = post.properties.Slug.rich_text

      let transformedPost = {
        loc: `https://www.cryptoneur.xyz/blog/${slug.plain_text}`,
        lastmod: moment(post.last_edited_time).toISOString()
      }

      return transformedPost;
    });

  
    return getServerSideSitemap(ctx, posts)
  }
  
  // Default export to prevent next.js errors
  export default () => {}