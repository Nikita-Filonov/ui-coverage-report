import { render, screen } from '@testing-library/react';
import { InitialState } from '../Models/InitialState';
import { SelectorType } from '../Models/Selector';
import { InitialStateProvider, useInitialState } from './InitialStateProvider';

const StateSummary = () => {
  const { appConfig, appConfigs, appCoverage } = useInitialState();

  return (
    <output data-testid="state-summary">
      {appConfig.key}:{appConfigs.length}:{appCoverage.elements.length}
    </output>
  );
};

describe('InitialStateProvider', () => {
  afterEach(() => document.getElementById('state')?.remove());

  it('selects the first app with coverage from the embedded report state', () => {
    const state: InitialState = {
      config: {
        apps: [
          { key: 'empty', url: '', name: 'Empty', tags: [], repository: null },
          { key: 'covered', url: '', name: 'Covered', tags: [], repository: null }
        ]
      },
      createdAt: '2026-09-26',
      appsCoverage: {
        empty: { history: [], elements: [] },
        covered: {
          history: [],
          elements: [{ history: [], actions: [], selector: '#button', selectorType: SelectorType.CSS }]
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
        <StateSummary />
      </InitialStateProvider>
    );

    expect(screen.getByTestId('state-summary')).toHaveTextContent('covered:2:1');
  });

  it('starts with empty coverage when the embedded state is missing', () => {
    render(
      <InitialStateProvider>
        <StateSummary />
      </InitialStateProvider>
    );

    expect(screen.getByTestId('state-summary')).toHaveTextContent(':0:0');
  });

  it.each([
    ['empty JSON', ''],
    ['invalid JSON', 'invalid json'],
    ['missing applications', JSON.stringify({ config: {}, createdAt: '', appsCoverage: {} })]
  ])('starts with empty coverage for %s', (_, json) => {
    const script = document.createElement('script');
    script.id = 'state';
    script.type = 'application/json';
    script.textContent = json;
    document.body.appendChild(script);

    render(
      <InitialStateProvider>
        <StateSummary />
      </InitialStateProvider>
    );

    expect(screen.getByTestId('state-summary')).toHaveTextContent(':0:0');
  });
});
