import rssParser from 'rss-parser';
import Post from '../../models/post.model';

export const parseRSSAndSaveToDB = async () => {
  const parser = new rssParser();
  const feedUrl = process.env.FEED_URL || '';

  try {
    if (!feedUrl) throw new Error('RSS feed URL is missing');
    const feed = await parser.parseURL(feedUrl);

    feed.items.forEach(async (item) => {
      const { title, contentSnippet, pubDate } = item;

      const article = new Post({
        title,
        content: contentSnippet,
        date: pubDate,
      });
      await article.save();
      console.log('Article saved:', title);
    });
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
  }
};
