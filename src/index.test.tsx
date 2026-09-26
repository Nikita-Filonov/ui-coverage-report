import { render, screen } from '@testing-library/react';
import ReactDOM, { Root } from 'react-dom/client';
import { StorageKey } from './Services/Storage';

vi.mock('react-dom/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom/client')>();
  return { ...actual, default: { ...actual, createRoot: vi.fn() } };
});

describe('report entry point', () => {
  beforeEach(() => {
    localStorage.clear();
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  });

  afterEach(() => document.getElementById('root')?.remove());

  it('mounts the report and respects saved visibility preferences', async () => {
    const root = { render: vi.fn() };
    vi.mocked(ReactDOM.createRoot).mockReturnValue(root as unknown as Root);
    await import('./index');

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    const application = root.render.mock.calls[0][0];
    const { unmount } = render(application);

    expect(screen.getByText('UI coverage report')).toBeInTheDocument();
    expect(screen.getByText('Config')).toBeInTheDocument();
    expect(screen.getByText('Actions history')).toBeInTheDocument();
    expect(screen.getByText('Agent frame')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by selector')).toBeInTheDocument();
    unmount();

    localStorage.setItem(
      StorageKey.Features,
      JSON.stringify({
        configView: false,
        coverageHistoryView: false,
        agentView: false,
        elementCoverageView: false
      })
    );
    render(application);

    expect(screen.getByText('UI coverage report')).toBeInTheDocument();
    expect(screen.queryByText('Config')).not.toBeInTheDocument();
    expect(screen.queryByText('Actions history')).not.toBeInTheDocument();
    expect(screen.queryByText('Agent frame')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Search by selector')).not.toBeInTheDocument();
  });
});
