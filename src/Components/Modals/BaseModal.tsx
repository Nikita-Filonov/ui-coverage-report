import { Box, Breakpoint, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FC, ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export type BaseModalProps = {
  children: ReactNode;
  title: string;
  modal: boolean;
  setModal: (modal: boolean) => void;
  maxWidth?: Breakpoint;
  onCancel?: () => void;
};

export const BaseModal: FC<BaseModalProps> = (props) => {
  const { children, title, modal, setModal, maxWidth, onCancel } = props;

  const onClose = () => (onCancel ? onCancel() : setModal(false));

  return (
    <Dialog sx={{ zIndex: 1900 }} open={modal} onClose={onClose} scroll={'paper'} fullWidth maxWidth={maxWidth}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DialogTitle>{title}</DialogTitle>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ mr: 2 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers={true}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
