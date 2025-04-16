import { filterElementCoverageByActions } from './Coverage';
import { AgentState } from '../Models/Agent';
import { RefObject, useEffect } from 'react';
import { useAgentFilters } from '../Providers/AgentFiltersProvider';
import { useAgentSettings } from '../Providers/AgentSettingsProvider';
import { useInitialState } from '../Providers/InitialStateProvider';

type UseAgentActionsProps = {
  frameRef: RefObject<HTMLIFrameElement | null>;
};

export const useAgentActions = ({ frameRef }: UseAgentActionsProps) => {
  const { filters } = useAgentFilters();
  const { settings } = useAgentSettings();
  const { appCoverage } = useInitialState();

  const postMessage = (state: AgentState) => {
    const frameWindow = frameRef?.current?.contentWindow;
    if (frameWindow) {
      frameWindow.postMessage(state, '*');
    }
  };

  const onSyncAgent = () => {
    postMessage({
      settings,
      elements: filterElementCoverageByActions({ elements: appCoverage.elements, actions: filters.actions })
    });
  };

  const onClearAgent = () => postMessage({ settings, elements: [] });

  useEffect(() => {
    onSyncAgent();
  }, [filters, settings]);

  return { onSyncAgent, onClearAgent };
};
