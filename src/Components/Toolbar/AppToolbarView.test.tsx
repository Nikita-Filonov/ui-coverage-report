import { fireEvent, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { InitialState } from '../../Models/InitialState';
import { ActionType } from '../../Models/Actions';
import { SelectorType } from '../../Models/Selector';
import { FeaturesProvider } from '../../Providers/FeaturesProvider';
import { InitialStateProvider } from '../../Providers/InitialStateProvider';
import { ThemeProvider } from '../../Providers/ThemeProvider';
import { StorageKey } from '../../Services/Storage';
import { AppConfigView } from '../../Views/Config/ConfigView';
import { AppToolbarView } from './AppToolbarView';

describe('AppToolbarView', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 10, 100, 30));
  });

  afterEach(() => document.getElementById('state')?.remove());

  const renderToolbar = () =>
    render(
      <ThemeProvider>
        <FeaturesProvider>
          <InitialStateProvider>
            <AppToolbarView />
            <AppConfigView />
          </InitialStateProvider>
        </FeaturesProvider>
      </ThemeProvider>
    );

  it('switches themes and opens, edits and closes feature settings', async () => {
    renderToolbar();

    expect(screen.getByText('App not selected')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('DarkModeOutlinedIcon').closest('button')!);
    expect(JSON.parse(localStorage.getItem(StorageKey.ThemeMode) || '')).toBe('dark');
    fireEvent.click(screen.getByTestId('LightModeOutlinedIcon').closest('button')!);
    expect(JSON.parse(localStorage.getItem(StorageKey.ThemeMode) || '')).toBe('light');

    fireEvent.click(screen.getByTestId('TuneIcon').closest('button')!);
    const modal = screen.getByRole('dialog', { name: 'Features' });
    fireEvent.click(within(modal).getByRole('checkbox', { name: 'Agent view' }));
    expect(JSON.parse(localStorage.getItem(StorageKey.Features) || '').agentView).toBe(false);

    fireEvent.click(within(modal).getByRole('button', { name: 'Cancel' }));
    await waitForElementToBeRemoved(modal);
  });

  it('selects another application from the popover and displays its configuration', async () => {
    const state: InitialState = {
      config: {
        apps: [
          { key: 'alpha', name: 'Alpha', url: '', tags: ['smoke'], repository: 'alpha-repository' },
          { key: 'beta', name: 'Beta', url: '', tags: [], repository: null }
        ]
      },
      createdAt: '2026-09-26T10:30:00',
      appsCoverage: {
        alpha: {
          history: [],
          elements: [
            {
              selector: '#save',
              selectorType: SelectorType.CSS,
              actions: [{ type: ActionType.Click, count: 1 }],
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
    renderToolbar();

    expect(screen.getByText('smoke')).toBeInTheDocument();
    expect(screen.getByText('App repository: alpha-repository')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Alpha' }));
    const search = screen.getByPlaceholderText('Search by name');
    fireEvent.click(screen.getByRole('button', { name: 'Beta' }));
    await waitForElementToBeRemoved(search);

    expect(screen.getByText('App name: Beta')).toBeInTheDocument();
    expect(screen.queryByText('smoke')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Beta' }));
    const reopenedSearch = screen.getByPlaceholderText('Search by name');
    fireEvent.keyDown(reopenedSearch, { key: 'Escape' });
    await waitForElementToBeRemoved(reopenedSearch);
  });
});
