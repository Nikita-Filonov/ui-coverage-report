import { ActionType } from '../Models/Actions';
import { ActionHistory } from '../Models/Coverage/CoverageHistory';
import dayjs from 'dayjs';
import { ActionCoverage } from '../Models/Coverage/Coverage';
import { blue, green, orange, purple } from '@mui/material/colors';

export const normalizeActionType = (action: ActionType): string => {
  return action
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

type GetActionsChartDataProps = {
  actions: (ActionHistory | ActionCoverage)[];
  createdAt: string;
};

export const getActionsChartData = (props: GetActionsChartDataProps): Record<string, number | Date> => {
  const { actions, createdAt } = props;

  const base: Record<string, number | Date> = {
    createdAt: dayjs(createdAt).toDate()
  };

  for (const action of actions) {
    base[action.type] = action.count;
  }

  return base;
};

export const MAP_ACTION_TYPE_TO_COLOR: Record<ActionType, string> = {
  [ActionType.Fill]: green['300'],
  [ActionType.Click]: blue['300'],
  [ActionType.AssertVisible]: purple['300'],
  [ActionType.AssertHaveText]: orange['300']
};
