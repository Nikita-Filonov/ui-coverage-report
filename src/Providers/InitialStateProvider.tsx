import React, { Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import { DEFAULT_APP_CONFIG, DEFAULT_APP_COVERAGE, InitialState, loadInitialState } from '../State/Controllers';
import { AppConfig } from '../Models/Config';
import { AppCoverage } from '../Models/Coverage/Coverage';

export type InitialStateContextProps = {
  appConfig: AppConfig;
  appConfigs: AppConfig[];
  setAppConfig: Dispatch<SetStateAction<AppConfig>>;
  createdAt: string;
  appCoverage: AppCoverage;
};

const InitialStateContext = React.createContext<InitialStateContextProps | null>(null);

const InitialStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<InitialState>(loadInitialState());
  const [appConfig, setAppConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = () => {
    const initialState = loadInitialState();
    for (const app of initialState.config.apps || []) {
      const appCoverage = initialState.appsCoverage[app.key];

      if (appCoverage.elements.length > 0) {
        setAppConfig(app);
        break;
      }
    }

    setState(initialState);
  };

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
