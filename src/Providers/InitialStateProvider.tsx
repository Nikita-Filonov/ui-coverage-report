import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { AppConfig } from '../Models/Config';
import { AppCoverage } from '../Models/Coverage/Coverage';
import { InitialState } from '../Models/InitialState';

const DEFAULT_APP_CONFIG: AppConfig = {
  key: '',
  url: '',
  name: '',
  tags: [],
  repository: null
};

const DEFAULT_APP_COVERAGE: AppCoverage = {
  history: [],
  elements: []
};

const DEFAULT_INITIAL_STATE: InitialState = {
  config: { apps: [] },
  createdAt: '',
  appsCoverage: {}
};

export const loadInitialState = (): InitialState => {
  const stateElement = document.getElementById('state');
  if (stateElement === null) {
    return DEFAULT_INITIAL_STATE;
  }

  try {
    return JSON.parse(stateElement.textContent || '');
  } catch {
    return DEFAULT_INITIAL_STATE;
  }
};

export type InitialStateContextProps = {
  appConfig: AppConfig;
  appConfigs: AppConfig[];
  setAppConfig: Dispatch<SetStateAction<AppConfig>>;
  createdAt: string;
  appCoverage: AppCoverage;
};

const InitialStateContext = createContext<InitialStateContextProps | null>(null);

const InitialStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState<InitialState>(loadInitialState);
  const [appConfig, setAppConfig] = useState<AppConfig>(
    () =>
      (state.config.apps || []).find((app) => state.appsCoverage[app.key]?.elements.length > 0) || DEFAULT_APP_CONFIG
  );

  return (
    <InitialStateContext.Provider
      value={{
        appConfig,
        appConfigs: state.config.apps || [],
        setAppConfig,
        createdAt: state.createdAt,
        appCoverage: state.appsCoverage[appConfig.key] || DEFAULT_APP_COVERAGE
      }}>
      {children}
    </InitialStateContext.Provider>
  );
};

const useInitialState = () => {
  const event = useContext(InitialStateContext);
  if (event == null) {
    throw new Error('useInitialState() called outside of a InitialStateProvider?');
  }
  return event;
};

export { InitialStateProvider, useInitialState };
