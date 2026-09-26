import { loadFromStorage, saveIntoStorage, StorageKey } from './Storage';

describe('coverage report storage', () => {
  beforeEach(() => localStorage.clear());

  it('uses the fallback for missing or invalid saved data', () => {
    const fallback = { actions: ['CLICK'] };

    expect(loadFromStorage({ key: StorageKey.AgentFilters, fallback })).toEqual(fallback);

    localStorage.setItem(StorageKey.AgentFilters, '{invalid');
    expect(loadFromStorage({ key: StorageKey.AgentFilters, fallback })).toEqual(fallback);
  });

  it('round trips saved settings', () => {
    const settings = { badgeContentType: 'COUNT', enabled: true };

    saveIntoStorage({ key: StorageKey.AgentSettings, data: settings });

    expect(loadFromStorage({ key: StorageKey.AgentSettings, fallback: null })).toEqual(settings);
  });
});
