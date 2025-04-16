import { Box } from '@mui/material';
import { BoxView } from '../../../Components/Views/BoxView';
import { ActionType } from '../../../Models/Actions';
import { BaseCheckbox } from '../../../Components/Checkboxes/BaseCheckbox';
import { normalizeActionType } from '../../../Services/Actions';
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
      actions: filters.actions.includes(type) ? filters.actions.filter((t) => t !== type) : [...filters.actions, type]
    });
  };

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
    </Box>
  );
};
