import { fireEvent, render, screen } from '@testing-library/react';
import { ActionType } from '../../../Models/Actions';
import { ActionTypeGroupFiltersView } from './ActionTypeGroupFiltersView';

describe('ActionTypeGroupFiltersView', () => {
  it('selects a whole group while preserving other action groups', () => {
    const setFilters = vi.fn();
    render(<ActionTypeGroupFiltersView filters={{ actions: [ActionType.Fill] }} setFilters={setFilters} />);

    expect(screen.getByRole('checkbox', { name: 'Action' })).not.toBeChecked();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Action' }));

    expect(setFilters).toHaveBeenCalledWith({ actions: [ActionType.Fill, ActionType.Click, ActionType.Hover] });
  });

  it('deselects a checked group while preserving other actions', () => {
    const setFilters = vi.fn();
    render(
      <ActionTypeGroupFiltersView
        filters={{ actions: [ActionType.Fill, ActionType.Click, ActionType.Hover] }}
        setFilters={setFilters}
      />
    );

    expect(screen.getByRole('checkbox', { name: 'Action' })).toBeChecked();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Action' }));

    expect(setFilters).toHaveBeenCalledWith({ actions: [ActionType.Fill] });
  });
});
