import { act, fireEvent, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { AgentInitialStateProvider } from '../../../Providers/AgentInitialStateProvider';
import { SettingsManager } from '../../../Services/Config';
import { ActionType } from '../../../Models/Actions';
import { AgentBadgeContentType } from '../../../Models/Agent';
import { Color } from '../../../Models/Core';
import { SelectorType } from '../../../Models/Selector';
import { ElementsView } from './ElementsView';

describe('ElementsView', () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 10, 100, 30));
  });

  afterEach(() => document.getElementById('save')?.remove());

  it('highlights matching elements, opens their details and removes overlays on clear', async () => {
    const button = document.createElement('button');
    button.id = 'save';
    button.textContent = 'Save';
    document.body.appendChild(button);
    const { unmount } = render(
      <AgentInitialStateProvider>
        <ElementsView />
      </AgentInitialStateProvider>
    );
    expect(screen.queryByText('3')).not.toBeInTheDocument();

    const element = {
      selector: '#save',
      selectorType: SelectorType.CSS,
      actions: [{ type: ActionType.Click, count: 3 }],
      history: [{ createdAt: '2026-09-26T10:00:00', actions: [{ type: ActionType.Click, count: 3 }] }]
    };
    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            type: SettingsManager.agentType,
            elements: [element, { ...element, selector: '#missing' }],
            settings: {
              overlayColor: Color.Error,
              badgeColor: Color.Primary,
              badgeContentType: AgentBadgeContentType.TotalNumberOfActions
            }
          }
        })
      );
    });

    expect(button.style.backgroundColor).toBe('rgba(211, 47, 47, 0.1)');
    expect(screen.getAllByText('3')).toHaveLength(1);
    fireEvent.click(screen.getByText('3').closest('button')!);
    const modal = screen.getByRole('dialog', { name: 'Element details' });
    expect(within(modal).getByText('Selector: #save')).toBeInTheDocument();
    expect(within(modal).getByText('Element history')).toBeInTheDocument();
    fireEvent.click(within(modal).getByRole('button', { name: 'Cancel' }));
    await waitForElementToBeRemoved(modal);

    act(() =>
      window.dispatchEvent(new MessageEvent('message', { data: { type: SettingsManager.agentType, elements: [] } }))
    );
    expect(screen.queryByText('3')).not.toBeInTheDocument();
    expect(button.style.outline).toBe('');
    unmount();
  });
});
