import { useGetPostsQuery } from '@services/postsApi';
import { PostData } from '@types';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBasePath } from '../utils';
import useDebounce from './useDebounce';

export const usePostPageLogic = () => {
  let { page } = useParams();
  const location = useLocation();

  const [requestData, setRequestData] = useState({
    page: page ? parseInt(page) : 1,
    search: '',
    sort: '',
  });

  const { data, error, isLoading, isFetching } = useGetPostsQuery(requestData);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const navigate = useNavigate();

  const handleSort = (value: string) => {
    setRequestData({ ...requestData, sort: value });
  };

  const handlePagination = (event: ChangeEvent<unknown>, n: number) => {
    setRequestData({ ...requestData, page: n });
    navigate(`${getBasePath(location.pathname)}/page/${n}`);
    window.scrollTo(0, 0);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRead = (post: PostData) => {
    navigate(`/posts/${post._id}`);
  };

  // Perform the search or update based on the debounced value
  useEffect(() => {
    setRequestData((prev) => ({
      ...prev,
      search: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  return {
    requestData,
    data,
    error,
    isLoading,
    searchTerm,
    debouncedSearchTerm,
    handleRead,
    handleSort,
    handlePagination,
    handleSearch,
    isFetching,
  };
};
