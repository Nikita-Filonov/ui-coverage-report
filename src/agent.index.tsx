import { watchFrameRoot } from './Services/Frame/Root';
import { AgentInitialStateProvider } from './Providers/AgentInitialStateProvider';
import { ElementsView } from './Views/Agent/Elements/ElementsView';

const IndexAgent = () => {
  return (
    <AgentInitialStateProvider>
      <ElementsView />
    </AgentInitialStateProvider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  watchFrameRoot(() => <IndexAgent />);
});
