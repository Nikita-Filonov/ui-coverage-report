import { act, renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { ActionType } from '../Models/Actions';
import { SelectorType } from '../Models/Selector';
import { InitialState } from '../Models/InitialState';
import { Color } from '../Models/Core';
import { AgentFiltersProvider, useAgentFilters } from '../Providers/AgentFiltersProvider';
import { AgentSettingsProvider, useAgentSettings } from '../Providers/AgentSettingsProvider';
import { InitialStateProvider } from '../Providers/InitialStateProvider';
import { ThemeProvider, useTheme } from '../Providers/ThemeProvider';
import { StorageKey } from './Storage';
import { SettingsManager } from './Config';
import { useAgentActions } from './Agent';

const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <InitialStateProvider>
      <AgentSettingsProvider>
        <AgentFiltersProvider>{children}</AgentFiltersProvider>
      </AgentSettingsProvider>
    </InitialStateProvider>
  </ThemeProvider>
);

describe('useAgentActions', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(StorageKey.AgentFilters, JSON.stringify({ actions: [ActionType.Click] }));
    const state: InitialState = {
      config: { apps: [{ key: 'app', name: 'App', url: '', tags: [], repository: null }] },
      createdAt: '2026-09-26',
      appsCoverage: {
        app: {
          history: [],
          elements: [
            {
              selector: '#save',
              selectorType: SelectorType.CSS,
              actions: [{ type: ActionType.Click, count: 3 }],
              history: []
            },
            {
              selector: '#help',
              selectorType: SelectorType.CSS,
              actions: [{ type: ActionType.Hover, count: 2 }],
              history: []
            }
          ]
        }
      }
    };
    const script = document.createElement('script');
    script.id = 'state';
    script.type = 'application/json';
    script.textContent = JSON.stringify(state);
    document.body.appendChild(script);
  });

  afterEach(() => {
    document.getElementById('state')?.remove();
    document.querySelector('iframe')?.remove();
  });

  it('syncs filtered coverage and clears the overlay without losing report data', () => {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    const postMessage = vi.spyOn(frame.contentWindow!, 'postMessage');
    const frameRef = { current: frame };
    const { result } = renderHook(() => useAgentActions({ frameRef }), { wrapper: Providers });

    expect(postMessage).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: SettingsManager.agentType,
        themeMode: 'light',
        elements: [expect.objectContaining({ selector: '#save' })]
      }),
      '*'
    );

    act(() => result.current.onClearAgent());
    expect(postMessage).toHaveBeenLastCalledWith(expect.objectContaining({ elements: [] }), '*');

    act(() => result.current.onSyncAgent());
    expect(postMessage).toHaveBeenLastCalledWith(
      expect.objectContaining({ elements: [expect.objectContaining({ selector: '#save' })] }),
      '*'
    );
  });

  it('syncs automatically when filters, settings and theme change', () => {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    const postMessage = vi.spyOn(frame.contentWindow!, 'postMessage');
    const frameRef = { current: frame };
    const { result } = renderHook(
      () => ({
        agent: useAgentActions({ frameRef }),
        filters: useAgentFilters(),
        settings: useAgentSettings(),
        theme: useTheme()
      }),
      { wrapper: Providers }
    );

    act(() => result.current.filters.setFilters({ actions: [ActionType.Hover] }));
    expect(postMessage).toHaveBeenLastCalledWith(
      expect.objectContaining({ elements: [expect.objectContaining({ selector: '#help' })] }),
      '*'
    );

    act(() => {
      result.current.settings.setSettings({ ...result.current.settings.settings, overlayColor: Color.Success });
    });
    expect(postMessage).toHaveBeenLastCalledWith(
      expect.objectContaining({ settings: expect.objectContaining({ overlayColor: Color.Success }) }),
      '*'
    );

    act(() => result.current.theme.onThemeMode());
    expect(postMessage).toHaveBeenLastCalledWith(expect.objectContaining({ themeMode: 'dark' }), '*');
  });

  it('tolerates a frame that has not mounted yet', () => {
    const { result } = renderHook(() => useAgentActions({ frameRef: { current: null } }), { wrapper: Providers });

    expect(() => result.current.onSyncAgent()).not.toThrow();
    expect(() => result.current.onClearAgent()).not.toThrow();
  });
});
