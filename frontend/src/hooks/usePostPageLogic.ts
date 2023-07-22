import { useGetPostsQuery } from '@services/postsApi';
import { PostData } from '@types';
import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from './useDebounce';

export const usePostPageLogic = () => {
  const [requestData, setRequestData] = useState({
    page: 1,
    search: '',
    sort: '',
  });
  const [modalData, setModalData] = useState({
    title: '',
    content: '',
    date: '',
  });

  const { data, error, isLoading, isFetching } = useGetPostsQuery(requestData);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleSort = (value: string) => {
    setRequestData({ ...requestData, sort: value });
  };

  const handlePagination = (event: ChangeEvent<unknown>, n: number) => {
    setRequestData({ ...requestData, page: n });
    window.scrollTo(0, 0);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRead = (post: PostData) => {
    setModalIsOpen(true);
    setModalData({ title: post.title, content: post.content, date: post.date });
  };

  // Perform the search or update based on the debounced value
  useEffect(() => {
    setRequestData((prev) => ({
      ...prev,
      page: 1,
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
    modalIsOpen,
    modalData,
    handleRead,
    handleModalClose,
    handleSort,
    handlePagination,
    handleSearch,
    isFetching,
  };
};
