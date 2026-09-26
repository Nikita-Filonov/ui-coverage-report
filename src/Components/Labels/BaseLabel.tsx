import { Chip, SxProps, Theme } from '@mui/material';
import { ChipProps } from '@mui/material/Chip';
import { FC, MouseEvent, ReactElement } from 'react';

export type LabelColor = NonNullable<ChipProps['color']>;

export type Props = {
  sx?: SxProps<Theme>;
  icon?: ReactElement;
  label?: string | number | null;
  color: LabelColor;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export const BaseLabel: FC<Props> = (props) => {
  const { sx, icon, label, color, onClick } = props;

  return <Chip sx={sx} size={'small'} icon={icon} color={color} label={label} onClick={onClick} />;
};
