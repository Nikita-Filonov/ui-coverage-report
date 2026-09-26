import { fireEvent, render, screen } from '@testing-library/react';
import { ActionType } from '../Models/Actions';
import { StorageKey } from '../Services/Storage';
import { AgentFiltersProvider, useAgentFilters } from './AgentFiltersProvider';

const FilterControls = () => {
  const { filters, setFilters, clearAllFilters } = useAgentFilters();

  return (
    <div>
      <output data-testid="actions">{filters.actions.join(',')}</output>
      <button onClick={() => setFilters({ actions: [ActionType.Click] })}>Only clicks</button>
      <button onClick={clearAllFilters}>Reset filters</button>
    </div>
  );
};

describe('AgentFiltersProvider', () => {
  beforeEach(() => localStorage.clear());

  it('loads saved filters and persists changes', () => {
    localStorage.setItem(StorageKey.AgentFilters, JSON.stringify({ actions: [ActionType.Hover] }));

    render(
      <AgentFiltersProvider>
        <FilterControls />
      </AgentFiltersProvider>
    );

    expect(screen.getByTestId('actions')).toHaveTextContent('HOVER');

    fireEvent.click(screen.getByRole('button', { name: 'Only clicks' }));
    expect(screen.getByTestId('actions')).toHaveTextContent('CLICK');
    expect(JSON.parse(localStorage.getItem(StorageKey.AgentFilters) || '')).toEqual({ actions: [ActionType.Click] });
  });

  it('restores all action filters when reset', () => {
    localStorage.setItem(StorageKey.AgentFilters, JSON.stringify({ actions: [ActionType.Click] }));

    render(
      <AgentFiltersProvider>
        <FilterControls />
      </AgentFiltersProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));

    expect(JSON.parse(localStorage.getItem(StorageKey.AgentFilters) || '')).toEqual({
      actions: Object.values(ActionType)
    });
  });
});
