import React from 'react';
import ReactDOM from 'react-dom/client';
import { InitialStateProvider } from './Providers/InitialStateProvider';
import { AppConfigView } from './Views/Config/ConfigView';
import { MainLayout } from './Components/Layouts/MainLayout';
import { AppToolbarView } from './Components/Toolbar/AppToolbarView';
import { ThemeProvider } from './Providers/ThemeProvider';
import { AgentView } from './Views/Agent/AgentView';
import { AppCoverageHistoryView } from './Views/CoverageHistory/AppCoverageHistoryView';
import { ElementCoverageView } from './Views/Coverage/ElementCoverageView';
import { FeaturesProvider, useFeatures } from './Providers/FeaturesProvider';

const IndexRoute = () => {
  const { features } = useFeatures();

  return (
    <MainLayout>
      <AppToolbarView />
      {features.configView && <AppConfigView />}
      {features.coverageHistoryView && <AppCoverageHistoryView />}
      {features.agentView && <AgentView />}
      {features.elementCoverageView && <ElementCoverageView />}
    </MainLayout>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FeaturesProvider>
        <InitialStateProvider>
          <IndexRoute />
        </InitialStateProvider>
      </FeaturesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
