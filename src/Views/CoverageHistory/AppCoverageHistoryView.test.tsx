import { render, screen } from '@testing-library/react';
import { AppHistory } from '../../Models/Coverage/CoverageHistory';
import { ActionType } from '../../Models/Actions';
import { SelectorType } from '../../Models/Selector';
import { InitialStateProvider } from '../../Providers/InitialStateProvider';
import { BaseBarChart } from '../../Components/Charts/BaseBarChart';
import { AppCoverageHistoryView } from './AppCoverageHistoryView';
import { dateTimeValueFormatter } from '../../Services/Charts';

vi.mock('../../Components/Charts/BaseBarChart', () => ({ BaseBarChart: vi.fn(() => null) }));

describe('AppCoverageHistoryView', () => {
  afterEach(() => document.getElementById('state')?.remove());

  it('builds chronological element and action series from report history', () => {
    const history: AppHistory[] = [
      {
        createdAt: '2026-09-25T10:00:00',
        totalElements: 2,
        totalActions: 4,
        actions: [{ type: ActionType.Click, count: 4 }]
      },
      {
        createdAt: '2026-09-26T10:00:00',
        totalElements: 3,
        totalActions: 7,
        actions: [{ type: ActionType.Click, count: 7 }]
      }
    ];
    const script = document.createElement('script');
    script.id = 'state';
    script.type = 'application/json';
    script.textContent = JSON.stringify({
      config: { apps: [{ key: 'app', name: 'App', url: '', tags: [], repository: null }] },
      createdAt: history[1].createdAt,
      appsCoverage: {
        app: { history, elements: [{ selector: '#save', selectorType: SelectorType.CSS, actions: [], history: [] }] }
      }
    });
    document.body.appendChild(script);

    render(
      <InitialStateProvider>
        <AppCoverageHistoryView />
      </InitialStateProvider>
    );

    expect(screen.getByText('Total number of elements')).toBeInTheDocument();
    expect(screen.getByText('Total number of actions')).toBeInTheDocument();
    expect(screen.getByText('Actions history')).toBeInTheDocument();
    const charts = vi.mocked(BaseBarChart).mock.calls.map(([props]) => props);
    expect(charts[0].yAxis[0]).toEqual(expect.objectContaining({ label: 'Total elements', data: [2, 3] }));
    expect(charts[1].yAxis[0]).toEqual(expect.objectContaining({ label: 'Total actions', data: [4, 7] }));
    expect(charts[0].xAxis[0].data).toEqual(history.map((item) => new Date(item.createdAt)));
    expect(charts[2].dataset).toEqual([
      { createdAt: new Date(history[0].createdAt), CLICK: 4 },
      { createdAt: new Date(history[1].createdAt), CLICK: 7 }
    ]);
    expect(charts[2].yAxis).toContainEqual(expect.objectContaining({ dataKey: ActionType.Click, stack: 'total' }));
    expect(dateTimeValueFormatter(new Date(history[1].createdAt))).toBe('2026-09-26 10:00');
  });
});
