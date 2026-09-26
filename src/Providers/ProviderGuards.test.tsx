import { renderHook } from '@testing-library/react';
import { useAgentFilters } from './AgentFiltersProvider';
import { useAgentInitialState } from './AgentInitialStateProvider';
import { useAgentSettings } from './AgentSettingsProvider';
import { useFeatures } from './FeaturesProvider';
import { useInitialState } from './InitialStateProvider';
import { useTheme } from './ThemeProvider';

describe('provider guards', () => {
  it.each([
    ['AgentFiltersProvider', useAgentFilters],
    ['AgentInitialStateProvider', useAgentInitialState],
    ['AgentSettingsProvider', useAgentSettings],
    ['FeaturesProvider', useFeatures],
    ['InitialStateProvider', useInitialState],
    ['ThemeProvider', useTheme]
  ])('rejects using context outside %s', (provider, useContext) => {
    expect(() => renderHook(() => useContext())).toThrow(provider);
  });
});
