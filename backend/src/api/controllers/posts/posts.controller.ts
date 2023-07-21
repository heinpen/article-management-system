import { RequestHandler } from 'express';
import {
  createPost,
  deletePost,
  getPaginatedPosts,
  getPostById,
  updatePost,
} from '../../services/posts/post.service';

export interface PostData {
  title: string;
  content: string;
}

// Handle the creation of a new post
export const apiCreatePost: RequestHandler = async (req, res, next) => {
  try {
    const data: PostData = req.body;
    const createdPost = await createPost(data);

    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

// Get all posts
export const apiGetPosts: RequestHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const searchTerm = req.query.search as string | undefined;
    const sortValue = (req.query.sort as string) || 'newest';
    const perPage = 12;

    const { posts, pagination } = await getPaginatedPosts(
      searchTerm,
      sortValue,
      page,
      perPage
    );

    const sortingValues = [
      { label: 'Oldest', value: 'oldest' },
      { label: 'Newest', value: 'newest' },
    ];

    res.json({ posts, pagination, sortingValues });
  } catch (error) {
    next(error);
  }
};

// Get a specific post by ID
export const apiGetPost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await getPostById(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Update a specific post by ID
export const apiUpdatePost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedPost = await updatePost(id, data);

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Delete a specific post by ID
export const apiDeletePost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await deletePost(id);

    res.json({ message });
  } catch (error) {
    next(error);
  }
};
