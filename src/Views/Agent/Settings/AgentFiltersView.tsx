import { Box } from '@mui/material';
import { BoxView } from '../../../Components/Views/BoxView';
import { ActionType } from '../../../Models/Actions';
import { BaseCheckbox } from '../../../Components/Checkboxes/BaseCheckbox';
import { ACTION_TYPES_BY_GROUP, normalizeActionType } from '../../../Services/Actions';
import { AgentFilters } from '../../../Models/Agent';
import { FC } from 'react';

type Props = {
  filters: AgentFilters;
  setFilters: (filters: AgentFilters) => void;
};

export const AgentFiltersView: FC<Props> = ({ filters, setFilters }) => {
  const onAction = (type: ActionType) => () => {
    setFilters({
      ...filters,
      actions: filters.actions.includes(type)
        ? filters.actions.filter((action) => action !== type)
        : [...filters.actions, type]
    });
  };

  const onActions = (types: ActionType[]) => () => {
    setFilters({
      ...filters,
      actions: isActionsChecked(types)
        ? filters.actions.filter((action) => !types.includes(action)) // снять группу
        : [...filters.actions, ...types] // добавить группу
    });
  };

  const isActionsChecked = (types: ActionType[]) => types.every((action) => filters.actions.includes(action));

  return (
    <Box>
      <BoxView title={'Actions filters'} containerSx={{ mt: 0 }}>
        {Object.values(ActionType).map((action, index) => (
          <BaseCheckbox
            key={index}
            label={normalizeActionType(action)}
            checked={filters.actions.includes(action)}
            onChange={onAction(action)}
          />
        ))}
      </BoxView>
      <BoxView title={'Actions group filters'}>
        <BaseCheckbox
          label={'Input'}
          checked={isActionsChecked(ACTION_TYPES_BY_GROUP.input)}
          onChange={onActions(ACTION_TYPES_BY_GROUP.input)}
        />
        <BaseCheckbox
          label={'Action'}
          checked={isActionsChecked(ACTION_TYPES_BY_GROUP.action)}
          onChange={onActions(ACTION_TYPES_BY_GROUP.action)}
        />
        <BaseCheckbox
          label={'Assert'}
          checked={isActionsChecked(ACTION_TYPES_BY_GROUP.assert)}
          onChange={onActions(ACTION_TYPES_BY_GROUP.assert)}
        />
      </BoxView>
    </Box>
  );
};
