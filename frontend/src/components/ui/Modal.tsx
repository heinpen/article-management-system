import { Dialog } from '@mui/material';
import { useState, useEffect, FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  // Delay mounting the modal to prevent scroll issues
  // when the modal is opened immediately after rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <Dialog open={isOpen} onClose={onClose}>
      {children}
    </Dialog>,
    document.body,
  );
};

export default Modal;
