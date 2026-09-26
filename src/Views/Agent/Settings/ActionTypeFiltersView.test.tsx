import { fireEvent, render, screen } from '@testing-library/react';
import { ActionType } from '../../../Models/Actions';
import { ActionTypeFiltersView } from './ActionTypeFiltersView';

describe('ActionTypeFiltersView', () => {
  it('adds and removes actions through checkboxes', () => {
    const setFilters = vi.fn();
    render(
      <ActionTypeFiltersView
        title="Action filters"
        actions={[ActionType.Click, ActionType.Hover]}
        filters={{ actions: [ActionType.Click] }}
        setFilters={setFilters}
      />
    );

    expect(screen.getByRole('checkbox', { name: 'Click' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Hover' })).not.toBeChecked();

    fireEvent.click(screen.getByRole('checkbox', { name: 'Hover' }));
    expect(setFilters).toHaveBeenCalledWith({ actions: [ActionType.Click, ActionType.Hover] });

    fireEvent.click(screen.getByRole('checkbox', { name: 'Click' }));
    expect(setFilters).toHaveBeenLastCalledWith({ actions: [] });
  });
});
