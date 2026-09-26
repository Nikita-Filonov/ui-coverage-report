import { filterElementCoverageByActions } from './Coverage';
import { AgentState } from '../Models/Agent';
import { RefObject, useCallback, useEffect } from 'react';
import { useAgentFilters } from '../Providers/AgentFiltersProvider';
import { useAgentSettings } from '../Providers/AgentSettingsProvider';
import { useInitialState } from '../Providers/InitialStateProvider';
import { useTheme } from '../Providers/ThemeProvider';
import { SettingsManager } from './Config';

type UseAgentActionsProps = {
  frameRef: RefObject<HTMLIFrameElement | null>;
};

export const useAgentActions = ({ frameRef }: UseAgentActionsProps) => {
  const { filters } = useAgentFilters();
  const { settings } = useAgentSettings();
  const { themeMode } = useTheme();
  const { appCoverage } = useInitialState();

  const postMessage = useCallback(
    (state: AgentState) => {
      const frameWindow = frameRef?.current?.contentWindow;
      if (frameWindow) {
        frameWindow.postMessage(state, '*');
      }
    },
    [frameRef]
  );

  const onSyncAgent = useCallback(() => {
    const elements = filterElementCoverageByActions({ elements: appCoverage.elements, actions: filters.actions });
    postMessage({ type: SettingsManager.agentType, settings, elements, themeMode });
  }, [appCoverage.elements, filters.actions, postMessage, settings, themeMode]);

  useEffect(() => {
    onSyncAgent();
  }, [onSyncAgent]);

  const onClearAgent = () => postMessage({ type: SettingsManager.agentType, settings, elements: [], themeMode });

  return { onSyncAgent, onClearAgent };
};
