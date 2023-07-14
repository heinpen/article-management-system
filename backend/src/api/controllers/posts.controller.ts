import { RequestHandler } from 'express';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../services/posts/post.service';

export interface PostData {
  title: string;
  content: string;
  author: string;
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
    const page = parseInt(req.query.page as string) || 1; // Получаем номер страницы из параметров запроса, или устанавливаем значение 1 по умолчанию
    const perPage = 12; // Количество постов на одной странице
    const startIndex = (page - 1) * perPage; // Вычисляем начальный индекс постов для текущей страницы
    const endIndex = startIndex + perPage; // Вычисляем конечный индекс постов для текущей страницы

    const posts = await getPosts();

    const paginatedPosts = posts.slice(startIndex, endIndex); // Вырезаем посты для текущей страницы из общего списка
    const totalPages = Math.ceil(posts.length / perPage); // Вычисляем общее количество страниц
    const totalPosts = posts.length; // Вычисляем общее количество постов

    const pagination = {
      totalPages: totalPages,
      totalPosts: totalPosts,
    };

    console.log(posts);
    // res.json(posts);
    res.json({ pagination, posts: paginatedPosts });
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
