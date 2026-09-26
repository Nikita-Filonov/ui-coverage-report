import { fireEvent, render, screen } from '@testing-library/react';
import { FeaturesProvider } from '../../Providers/FeaturesProvider';
import { StorageKey } from '../../Services/Storage';
import { FeaturesView } from './FeaturesView';

describe('FeaturesView', () => {
  beforeEach(() => localStorage.clear());

  it('lets users hide each report section and restore them all', () => {
    render(
      <FeaturesProvider>
        <FeaturesView />
      </FeaturesProvider>
    );

    for (const name of ['Config view', 'Coverage history view', 'Agent view', 'Element coverage view']) {
      const checkbox = screen.getByRole('checkbox', { name });
      expect(checkbox).toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    }
    expect(JSON.parse(localStorage.getItem(StorageKey.Features) || '')).toEqual({
      configView: false,
      coverageHistoryView: false,
      agentView: false,
      elementCoverageView: false
    });

    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    for (const checkbox of screen.getAllByRole('checkbox')) expect(checkbox).toBeChecked();
  });
});
