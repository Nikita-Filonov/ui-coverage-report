import { BaseTableCell } from '../../BaseTableCell';
import { FC, ReactNode } from 'react';
import { ActionType } from '../../../../Models/Actions';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import { normalizeActionType } from '../../../../Services/Actions';

type Props = {
  type: ActionType;
};

const MAP_ACTION_TYPE_TO_ICON: Record<ActionType, ReactNode> = {
  [ActionType.Fill]: <EditOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.Click]: <MouseOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.AssertVisible]: <VisibilityOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />,
  [ActionType.AssertHaveText]: <TextSnippetOutlinedIcon sx={{ mr: 1.5 }} fontSize={'small'} />
};

export const ActionCell: FC<Props> = ({ type }) => {
  return <BaseTableCell text={normalizeActionType(type)} icon={MAP_ACTION_TYPE_TO_ICON[type]} />;
};
