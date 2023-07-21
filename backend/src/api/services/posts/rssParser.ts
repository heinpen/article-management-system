import rssParser from 'rss-parser';
import Post from '../../models/post.model';

export const parseRSSAndSaveToDB = async () => {
  const parser = new rssParser();
  const feedUrl = 'https://feeds.simplecast.com/xWZglpA_'; // Replace with your RSS feed URL

  try {
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
