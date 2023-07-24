import Layout from '@components/Layout/Layout';
import AdminModal from '@components/posts/AdminModal';

import AdminPostsList from '@components/posts/AdminPostList';
import AlertWrapper from '@components/ui/AlertWrapper';
import Search from '@components/ui/Search';
import Sort from '@components/ui/Sort';
import { usePostPageLogic } from '@hooks/usePostPageLogic';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from '@services/postsApi';
import { AdminModalData, PostData } from '@types';
import { useState, type FC } from 'react';

const AdminDashboard: FC = () => {
  const {
    data,
    error,
    isLoading,
    handleRead,
    handleSort,
    handlePagination,
    handleSearch,
    requestData,
    isFetching,
  } = usePostPageLogic();

  const [adminModalIsOpen, setAdminModalIsOpen] = useState(false);

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [createPost] = useCreatePostMutation();

  const [adminModalData, setAdminModalData] = useState<AdminModalData>({
    post: null,
    isCreate: false,
    isUpdate: false,
  });

  const { isCreate, isUpdate, post } = adminModalData;

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
    setAdminModalIsOpen(false);
  };

  const handleAdminModalClose = () => {
    setAdminModalIsOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deletePost({ id, requestData });
  };

  const handleCreate = () => {
    setAdminModalData((prev) => ({ ...prev, isUpdate: false, isCreate: true }));

    setAdminModalIsOpen(true);
  };

  const handleUpdate = (post: PostData, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAdminModalData({ post, isUpdate: true, isCreate: false });
    setAdminModalIsOpen(true);
  };

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
      <Box sx={{ flex: 1, opacity: isFetching ? 0.5 : 1  }} >
        {data?.posts && (
          <AdminPostsList
            posts={data?.posts}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleClick={handleRead}
          />
        )}
      </Box>
        <AdminModal
          isOpen={adminModalIsOpen}
          handleClose={handleAdminModalClose}
          handleSubmit={handleSubmit}
          modalData={adminModalData}
        ></AdminModal>
      <Pagination
        count={data?.pagination.totalPages}
        variant="outlined"
        page={requestData.page}
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
