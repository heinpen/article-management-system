import Layout from '@components/Layout/Layout';
import AdminModal from '@components/posts/AdminModal';

import AdminPostsList from '@components/posts/AdminPostList';
import AlertWrapper from '@components/ui/AlertWrapper';
import Search from '@components/ui/Search';
import Sort from '@components/ui/Sort';
import useDebounce from '@hooks/useDebounce';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '@services/postsApi';
import { AdminModalData, PostData, RequestData } from '@types';
import { ChangeEvent, useEffect, useState, type FC } from 'react';

const AdminDashboard: FC = () => {
  const [requestData, setRequestData] = useState<RequestData>({
    page: 1,
    search: '',
    sort: '',
  });
  const { data, error, isLoading, isFetching } = useGetPostsQuery(requestData);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [createPost] = useCreatePostMutation();

  const [modalData, setModalData] = useState<AdminModalData>({
    post: null,
    isCreate: false,
    isUpdate: false,
  });

  const { isCreate, isUpdate, post } = modalData;

  // Handle modal
  const handleSubmit = (values: { title: string; content: string }) => {
    if (isCreate) {
      createPost({
        data: values,
        requestData,
      });
    } else if (isUpdate && post) {
      updatePost({
        id: post._id,
        data: values,
        requestData,
      });
    }
    setModalIsOpen(false);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleDelete = (id: string) => {
    deletePost({ id, requestData });
  };

  const handleCreate = () => {
    setModalData((prev) => ({ ...prev, isUpdate: false, isCreate: true }));

    setModalIsOpen(true);
  };

  const handleUpdate = (post: PostData) => {
    setModalData({ post, isUpdate: true, isCreate: false });
    setModalIsOpen(true);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (value: string) => {
    setRequestData({ ...requestData, sort: value });
  };

  const handlePagination = (event: ChangeEvent<unknown>, n: number) => {
    setRequestData({ ...requestData, page: n });
    window.scrollTo(0, 0);
  };

  // Perform the search or update based on the debounced value
  useEffect(() => {
    setRequestData((prev) => ({
      ...prev,
      page: 1,
      search: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  return (
    <Layout>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ my: 2 }}
      >
        Posts
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Search handleSearch={handleSearch} />
          <AlertWrapper
            isLoading={isLoading || isFetching}
            error={error}
          ></AlertWrapper>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box>
            <Button variant="contained" onClick={handleCreate}>
              Add post
            </Button>
          </Box>

          <Box>
            <Sort handleSort={handleSort} sortData={data?.sortData} />
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ flex: 1 }}>
        {data?.posts && (
          <AdminPostsList
            posts={data?.posts}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
        <AdminModal
          isOpen={modalIsOpen}
          handleClose={handleModalClose}
          handleSubmit={handleSubmit}
          modalData={modalData}
        ></AdminModal>
      </Box>
      <Pagination
        count={data?.pagination.totalPages}
        variant="outlined"
        shape="rounded"
        onChange={handlePagination}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 2,
        }}
      />
    </Layout>
  );
};
export default AdminDashboard;
