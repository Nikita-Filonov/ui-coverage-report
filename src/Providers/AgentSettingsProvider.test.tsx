import { act, renderHook } from '@testing-library/react';
import { AgentBadgeContentType } from '../Models/Agent';
import { Color } from '../Models/Core';
import { StorageKey } from '../Services/Storage';
import { AgentSettingsProvider, useAgentSettings } from './AgentSettingsProvider';

describe('AgentSettingsProvider', () => {
  beforeEach(() => localStorage.clear());

  it('loads saved settings, persists edits and restores defaults', () => {
    const saved = {
      badgeColor: Color.Success,
      overlayColor: Color.Warning,
      badgeContentType: AgentBadgeContentType.TotalNumberOfActions
    };
    localStorage.setItem(StorageKey.AgentSettings, JSON.stringify(saved));
    const { result } = renderHook(useAgentSettings, { wrapper: AgentSettingsProvider });

    expect(result.current.settings).toEqual(saved);

    const updated = { ...saved, badgeColor: Color.Info };
    act(() => result.current.setSettings(updated));
    expect(result.current.settings).toEqual(updated);
    expect(JSON.parse(localStorage.getItem(StorageKey.AgentSettings) || '')).toEqual(updated);

    act(() => result.current.clearAllSettings());
    expect(result.current.settings).toEqual({
      badgeColor: Color.Primary,
      overlayColor: Color.Error,
      badgeContentType: AgentBadgeContentType.TotalNumberOfActionTypes
    });
    expect(JSON.parse(localStorage.getItem(StorageKey.AgentSettings) || '')).toEqual(result.current.settings);
  });
});
