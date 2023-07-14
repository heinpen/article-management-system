import { PostData } from '../../controllers/posts.controller';
import { CustomError } from '../../middleware/errorHandler';
import Post from '../../models/post.model';

// Create a new post
export const createPost = async ({ title, content, author }: PostData) => {
  const post = new Post({
    title,
    content,
    author,
  });

  return post.save();
};

// Get all posts
export const getPosts = async () => {
  return Post.find();
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
export const updatePost = async (
  id: string,
  { title, content, author }: PostData
) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new CustomError(404, 'Post not found');
  }

  post.title = title;
  post.content = content;
  post.author = author;

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
