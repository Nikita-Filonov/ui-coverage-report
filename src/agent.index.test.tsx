import { act, render, screen } from '@testing-library/react';
import { watchFrameRoot } from './Services/Frame/Root';
import { SettingsManager } from './Services/Config';
import { ThemeMode } from './Models/Theme';

vi.mock('./Services/Frame/Root', () => ({ watchFrameRoot: vi.fn() }));

describe('agent entry point', () => {
  it('starts watching the page after DOM readiness and renders the message-driven agent', async () => {
    await import('./agent.index');
    expect(watchFrameRoot).not.toHaveBeenCalled();

    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(watchFrameRoot).toHaveBeenCalledOnce();

    const getFrame = vi.mocked(watchFrameRoot).mock.calls[0][0];
    const { container } = render(getFrame());
    expect(container).toBeEmptyDOMElement();

    act(() =>
      window.dispatchEvent(
        new MessageEvent('message', {
          data: { type: SettingsManager.agentType, themeMode: ThemeMode.Light, elements: [] }
        })
      )
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
