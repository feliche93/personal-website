import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (slug, databaseId) => {
  const database = await notion.databases.query({
    database_id: databaseId,
  });
  const records = database.results;


  const filteredRecords = records.filter(function (record) {
      const [rich_text] = record.properties.Slug.rich_text;
      return rich_text.plain_text === slug;
  })

  const [ filteredRecord ] = filteredRecords;
  const pageId = filteredRecord.id;

  // console.log(pageId);

  const response = await notion.pages.retrieve({ page_id: pageId });
  return {
    page : response,
    pageId
  };
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};