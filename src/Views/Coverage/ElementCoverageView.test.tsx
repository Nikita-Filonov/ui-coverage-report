import { fireEvent, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { ActionType } from '../../Models/Actions';
import { InitialState } from '../../Models/InitialState';
import { SelectorType } from '../../Models/Selector';
import { InitialStateProvider } from '../../Providers/InitialStateProvider';
import { ElementCoverageView } from './ElementCoverageView';

describe('ElementCoverageView', () => {
  afterEach(() => document.getElementById('state')?.remove());

  it('filters the element table and opens element details', async () => {
    const state: InitialState = {
      config: {
        apps: [{ key: 'app', name: 'App', url: 'https://app.example.com', tags: [], repository: null }]
      },
      createdAt: '2025-01-01T00:00:00Z',
      appsCoverage: {
        app: {
          history: [],
          elements: [
            {
              selector: '#save',
              selectorType: SelectorType.CSS,
              actions: [{ type: ActionType.Click, count: 1 }],
              history: []
            },
            {
              selector: '#cancel',
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

    render(
      <InitialStateProvider>
        <ElementCoverageView />
      </InitialStateProvider>
    );

    expect(screen.getByText('#save')).toBeInTheDocument();
    expect(screen.getByText('#cancel')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search by selector'), { target: { value: 'SAVE' } });

    expect(screen.getByText('#save')).toBeInTheDocument();
    expect(screen.queryByText('#cancel')).not.toBeInTheDocument();
    expect(screen.getByText('Total results: 1')).toBeInTheDocument();

    const saveRow = screen.getByText('#save').closest('tr') as HTMLTableRowElement;
    fireEvent.click(within(saveRow).getByRole('button'));

    const details = screen.getByRole('dialog', { name: 'Element details' });
    expect(within(details).getByText('Selector: #save')).toBeInTheDocument();

    fireEvent.click(within(details).getByRole('button', { name: 'Cancel' }));
    await waitForElementToBeRemoved(details);
  });
});
