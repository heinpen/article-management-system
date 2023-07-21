import Modal from '@components/ui/Modal';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ModalData } from '@types';
import { useFormik } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';

interface AdminModalProps {
  isOpen: boolean;
  handleClose: () => void;
  modalData: ModalData;
  handleSubmit: (values: { title: string; content: string }) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
});

const AdminModal: FC<AdminModalProps> = ({
  isOpen,
  handleClose,
  modalData,
  handleSubmit,
}) => {
  const { post, isCreate } = modalData;

  const formik = useFormik({
    initialValues: {
      title: post?.title || '',
      content: post?.content || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        content: values.content,
        date: new Date().toISOString(),
      };
      handleSubmit(data);
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear any error if a user starts typing in inputs
    formik.handleChange(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <DialogTitle>{isCreate ? 'Create' : 'Edit'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ m: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="title"
            autoComplete="title"
            type="text"
            name="title"
            onChange={handleInput}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            name="content"
            label="content"
            type="content"
            id="content"
            autoComplete="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isCreate ? 'Create' : 'Update'}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Modal>
  );
};
export default AdminModal;
