import {
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Theme
} from '@mui/material';
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
  contentSx?: SxProps<Theme>;
};

export const BaseModal: FC<BaseModalProps> = (props) => {
  const { children, title, modal, setModal, maxWidth, onCancel, contentSx } = props;

  const onClose = () => (onCancel ? onCancel() : setModal(false));

  return (
    <Dialog open={modal} onClose={onClose} scroll={'paper'} fullWidth maxWidth={maxWidth}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DialogTitle>{title}</DialogTitle>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ mr: 2 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers={true} sx={contentSx}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
