import { AppConfig, Config } from '../Models/Config';
import { AppCoverage } from '../Models/Coverage/Coverage';

export interface InitialState {
  config: Config;
  createdAt: string;
  appsCoverage: { [x: string]: AppCoverage };
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  key: '',
  url: '',
  name: '',
  tags: [],
  repository: null
};

export const DEFAULT_APP_COVERAGE: AppCoverage = {
  history: [],
  elements: []
};

export const DEFAULT_INITIAL_STATE: InitialState = {
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
