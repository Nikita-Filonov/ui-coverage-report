import React, { Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { Color } from '../Models/Core';
import { AgentSettings } from '../Models/Agent';

const DEFAULT_AGENT_SETTINGS: AgentSettings = {
  badgeColor: Color.Primary,
  overlayColor: Color.Error
};

export type AgentSettingsContextProps = {
  settings: AgentSettings;
  setSettings: Dispatch<SetStateAction<AgentSettings>>;
  clearAllSettings: () => void;
};

const AgentSettingsContext = React.createContext<AgentSettingsContextProps | null>(null);

const AgentSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<AgentSettings>(DEFAULT_AGENT_SETTINGS);

  const clearAllSettings = () => setSettings(DEFAULT_AGENT_SETTINGS);

  return (
    <AgentSettingsContext.Provider value={{ settings, setSettings, clearAllSettings }}>
      {children}
    </AgentSettingsContext.Provider>
  );
};

const useAgentSettings = () => {
  const event = useContext(AgentSettingsContext);
  if (event == null) {
    throw new Error('useInitialState() called outside of a AgentSettingsProvider?');
  }
  return event;
};

export { AgentSettingsProvider, useAgentSettings };
