import { Popper } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { VisualElement } from '../../Services/Frame/Element';

type Props = {
  anchor: VisualElement;
} & PropsWithChildren;

export const BasePopper: FC<Props> = ({ anchor, children }) => {
  return (
    <Popper
      sx={{ zIndex: 1700 }}
      open={true}
      anchorEl={anchor}
      placement={'left'}
      disablePortal={false}
      modifiers={[
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['right', 'top', 'bottom']
          }
        }
      ]}>
      {children}
    </Popper>
  );
};
