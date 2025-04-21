import { ElementCoverage } from './Coverage/Coverage';
import { Color } from './Core';
import { ActionType } from './Actions';
import { ThemeMode } from './Theme';

export interface AgentFilters {
  actions: ActionType[];
}

export interface AgentSettings {
  badgeColor: Color;
  overlayColor: Color;
}

export interface AgentState {
  settings?: AgentSettings;
  elements?: ElementCoverage[];
  themeMode?: ThemeMode;
}
