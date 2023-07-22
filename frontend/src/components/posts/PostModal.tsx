import Modal from '@components/ui/Modal';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import type { FC } from 'react';

interface PostModalProps {
  isOpen: boolean;
  handleClose: () => void;
  modalData: {
    title: string;
    content: string;
    date: string;
  };
}

const PostModal: FC<PostModalProps> = ({ isOpen, handleClose, modalData }) => {
  const { title, content } = modalData;
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Modal>
  );
};
export default PostModal;
