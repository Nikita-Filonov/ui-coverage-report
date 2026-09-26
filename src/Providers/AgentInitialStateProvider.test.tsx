import { act, render, screen } from '@testing-library/react';
import { SettingsManager } from '../Services/Config';
import { AgentInitialStateProvider, useAgentInitialState } from './AgentInitialStateProvider';

const MessageState = () => {
  const { state } = useAgentInitialState();
  return <output data-testid="message-type">{state.type || 'empty'}</output>;
};

describe('AgentInitialStateProvider', () => {
  afterEach(() => vi.restoreAllMocks());

  it('accepts messages for its agent type and ignores other messages', () => {
    const agentType = 'coverage-agent';
    vi.spyOn(SettingsManager, 'agentType', 'get').mockReturnValue(agentType);
    render(
      <AgentInitialStateProvider>
        <MessageState />
      </AgentInitialStateProvider>
    );

    act(() => window.dispatchEvent(new MessageEvent('message', { data: { type: 'another-agent' } })));
    expect(screen.getByTestId('message-type')).toHaveTextContent('empty');

    act(() => window.dispatchEvent(new MessageEvent('message', { data: { type: agentType } })));
    expect(screen.getByTestId('message-type')).toHaveTextContent(agentType);
  });
});
