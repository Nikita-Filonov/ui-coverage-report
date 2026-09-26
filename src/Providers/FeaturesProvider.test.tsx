import { act, renderHook } from '@testing-library/react';
import { StorageKey } from '../Services/Storage';
import { FeaturesProvider, useFeatures } from './FeaturesProvider';

describe('FeaturesProvider', () => {
  beforeEach(() => localStorage.clear());

  it('loads enabled sections, persists changes and restores all sections', () => {
    const features = { agentView: false, configView: true, coverageHistoryView: false, elementCoverageView: true };
    localStorage.setItem(StorageKey.Features, JSON.stringify(features));
    const { result } = renderHook(useFeatures, { wrapper: FeaturesProvider });

    expect(result.current.features).toEqual(features);

    const updated = { ...features, configView: false };
    act(() => result.current.setFeatures(updated));
    expect(result.current.features).toEqual(updated);
    expect(JSON.parse(localStorage.getItem(StorageKey.Features) || '')).toEqual(updated);

    act(() => result.current.clearAllFeatures());
    expect(result.current.features).toEqual({
      agentView: true,
      configView: true,
      coverageHistoryView: true,
      elementCoverageView: true
    });
    expect(JSON.parse(localStorage.getItem(StorageKey.Features) || '')).toEqual(result.current.features);
  });
});
