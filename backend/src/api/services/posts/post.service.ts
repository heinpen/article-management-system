import { PostData } from '../../controllers/posts/posts.controller';
import { CustomError } from '../../middleware/errorHandler';
import Post from '../../models/post.model';

// Create a new post
export const createPost = async ({ title, content }: PostData) => {
  const post = new Post({
    title,
    content,
  });
  return post.save();
};

// Get posts
export const getPosts = async (searchTerm?: string, sortValue?: string) => {
  let query = Post.find();

  if (searchTerm) {
    query = query.where('title', new RegExp(searchTerm, 'i'));
  }

  if (sortValue === 'oldest') {
    query = query.sort({ date: 1 });
  }

  if (sortValue === 'newest') {
    query = query.sort({ date: -1 });
  }

  return query.exec();
};

export const getPaginatedPosts = async (
  searchTerm: string | undefined,
  sortValue: string | undefined,
  page: number,
  perPage: number,
) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const posts = await getPosts(searchTerm, sortValue);

  const paginatedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / perPage);
  const totalPosts = posts.length;

  return {
    posts: paginatedPosts,
    pagination: {
      totalPages: totalPages,
      totalPosts: totalPosts,
    },
  };
};

// Get a specific post by ID
export const getPostById = async (id: string) => {
  const post = Post.findById(id);
  if (!post) {
    throw new CustomError(404, 'Post not found');
  }

  return post;
};

// Update a specific post by ID
export const updatePost = async (id: string, { title, content }: PostData) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new CustomError(404, 'Post not found');
  }

  post.title = title;
  post.content = content;

  await post.save();

  return 'Post updated successfully';
};

// Delete a specific post by ID
export const deletePost = async (id: string) => {
  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    throw new CustomError(404, 'Post not found');
  }

  return 'Post deleted successfully';
};
