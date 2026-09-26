import { fireEvent, render, screen } from '@testing-library/react';
import { AppConfig } from '../../Models/Config';
import { InitialState } from '../../Models/InitialState';
import { SelectorType } from '../../Models/Selector';
import { InitialStateProvider, useInitialState } from '../../Providers/InitialStateProvider';
import { AppConfigSelectionListView } from './AppConfigSelectionListView';

const apps: AppConfig[] = [
  { key: 'alpha', name: 'Alpha', url: 'https://alpha.example.com', tags: [], repository: null },
  { key: 'beta', name: 'Beta', url: 'https://beta.example.com', tags: [], repository: null }
];

const SelectedApp = () => {
  const { appConfig } = useInitialState();
  return <div data-testid="selected-app">{appConfig.name}</div>;
};

describe('AppConfigSelectionListView', () => {
  afterEach(() => {
    document.getElementById('state')?.remove();
  });

  it('selects the app with coverage and lets users find another app', () => {
    const state: InitialState = {
      config: { apps },
      createdAt: '2025-01-01T00:00:00Z',
      appsCoverage: {
        alpha: { history: [], elements: [] },
        beta: {
          history: [],
          elements: [{ selector: '#save', selectorType: SelectorType.CSS, actions: [], history: [] }]
        }
      }
    };
    const script = document.createElement('script');
    script.id = 'state';
    script.type = 'application/json';
    script.textContent = JSON.stringify(state);
    document.body.appendChild(script);

    const onSelect = vi.fn();
    render(
      <InitialStateProvider>
        <AppConfigSelectionListView onSelectConfigCallback={onSelect} />
        <SelectedApp />
      </InitialStateProvider>
    );

    expect(screen.getByTestId('selected-app')).toHaveTextContent('Beta');

    fireEvent.change(screen.getByPlaceholderText('Search by name'), { target: { value: 'ALPHA' } });
    expect(screen.getByRole('button', { name: /Alpha/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Beta/ })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Alpha/ }));
    expect(screen.getByTestId('selected-app')).toHaveTextContent('Alpha');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
