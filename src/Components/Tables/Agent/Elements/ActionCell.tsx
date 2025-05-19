import { BaseTableCell } from '../../BaseTableCell';
import { FC, ReactNode } from 'react';
import { ActionType } from '../../../../Models/Actions';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { normalizeActionType } from '../../../../Services/Actions';

type Props = {
  type: ActionType;
};

export const MAP_ACTION_TYPE_TO_ICON: Record<ActionType, ReactNode> = {
  // input
  [ActionType.Fill]: <EditOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Type]: <EditOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Select]: <ArrowDropDownCircleOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,

  // action
  [ActionType.Click]: <MouseOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Hover]: <PanToolAltOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,

  // assert
  [ActionType.Text]: <TextFieldsIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Value]: <LabelOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Hidden]: <VisibilityOffOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Visible]: <VisibilityOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Checked]: <CheckBoxOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Enabled]: <ToggleOnIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Disabled]: <DoNotTouchOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Unchecked]: <CheckBoxOutlineBlankIcon sx={{ mr: 1.5 }} fontSize={'small'} />
};

export const ActionCell: FC<Props> = ({ type }) => {
  return <BaseTableCell text={normalizeActionType(type)} icon={MAP_ACTION_TYPE_TO_ICON[type]} />;
};
