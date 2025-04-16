import React, { Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { AgentFilters } from '../Models/Agent';
import { ActionType } from '../Models/Actions';

const DEFAULT_AGENT_FILTERS: AgentFilters = {
  actions: Object.values(ActionType)
};

export type AgentFiltersContextProps = {
  filters: AgentFilters;
  setFilters: Dispatch<SetStateAction<AgentFilters>>;
  clearAllFilters: () => void;
};

const AgentFiltersContext = React.createContext<AgentFiltersContextProps | null>(null);

const AgentFiltersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState<AgentFilters>(DEFAULT_AGENT_FILTERS);

  const clearAllFilters = () => setFilters(DEFAULT_AGENT_FILTERS);

  return (
    <AgentFiltersContext.Provider value={{ filters, setFilters, clearAllFilters }}>
      {children}
    </AgentFiltersContext.Provider>
  );
};

const useAgentFilters = () => {
  const event = useContext(AgentFiltersContext);
  if (event == null) {
    throw new Error('useInitialState() called outside of a AgentFiltersProvider?');
  }
  return event;
};

export { AgentFiltersProvider, useAgentFilters };
