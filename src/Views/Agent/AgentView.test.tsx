import { fireEvent, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { ActionType } from '../../Models/Actions';
import { Color } from '../../Models/Core';
import { AgentBadgeContentType } from '../../Models/Agent';
import { InitialStateProvider } from '../../Providers/InitialStateProvider';
import { ThemeProvider } from '../../Providers/ThemeProvider';
import { StorageKey } from '../../Services/Storage';
import { AgentView } from './AgentView';

describe('AgentView', () => {
  beforeEach(() => localStorage.clear());

  it('edits and resets filters and settings from the agent toolbar', async () => {
    render(
      <ThemeProvider>
        <InitialStateProvider>
          <AgentView />
        </InitialStateProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('No frame source provided')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('RefreshIcon').closest('button')!);
    fireEvent.click(screen.getByTestId('ClearIcon').closest('button')!);

    fireEvent.click(screen.getByTestId('FilterAltOutlinedIcon').closest('button')!);
    const filters = screen.getByRole('dialog', { name: 'Agent filters' });
    fireEvent.click(within(filters).getByRole('checkbox', { name: 'Click' }));
    expect(JSON.parse(localStorage.getItem(StorageKey.AgentFilters) || '').actions).not.toContain(ActionType.Click);

    fireEvent.click(within(filters).getByRole('button', { name: 'Clear all' }));
    expect(JSON.parse(localStorage.getItem(StorageKey.AgentFilters) || '').actions).toEqual(Object.values(ActionType));
    fireEvent.click(within(filters).getByRole('button', { name: 'Cancel' }));
    await waitForElementToBeRemoved(filters);

    fireEvent.click(screen.getByTestId('SettingsOutlinedIcon').closest('button')!);
    const settings = screen.getByRole('dialog', { name: 'Agent settings' });
    fireEvent.mouseDown(within(settings).getAllByRole('combobox')[0]);
    fireEvent.click(screen.getByRole('option', { name: 'Success' }));
    expect(JSON.parse(localStorage.getItem(StorageKey.AgentSettings) || '').badgeColor).toBe(Color.Success);

    fireEvent.click(within(settings).getByRole('button', { name: 'Clear all' }));
    expect(JSON.parse(localStorage.getItem(StorageKey.AgentSettings) || '')).toEqual({
      badgeColor: Color.Primary,
      overlayColor: Color.Error,
      badgeContentType: AgentBadgeContentType.TotalNumberOfActionTypes
    });
    fireEvent.click(within(settings).getByRole('button', { name: 'Cancel' }));
    await waitForElementToBeRemoved(settings);
  });
});
