import { fireEvent, render, screen } from '@testing-library/react';
import { AgentBadgeContentType, AgentSettings } from '../../../Models/Agent';
import { Color } from '../../../Models/Core';
import { AgentSettingsView } from './AgentSettingsView';

describe('AgentSettingsView', () => {
  const settings: AgentSettings = {
    badgeColor: Color.Primary,
    overlayColor: Color.Error,
    badgeContentType: AgentBadgeContentType.TotalNumberOfActionTypes
  };

  it.each([
    [0, 'Success', { badgeColor: Color.Success }],
    [1, 'Warning', { overlayColor: Color.Warning }],
    [2, 'Total number of actions', { badgeContentType: AgentBadgeContentType.TotalNumberOfActions }]
  ])('changes select %s while preserving the other settings', (index, option, update) => {
    const setSettings = vi.fn();
    render(<AgentSettingsView settings={settings} setSettings={setSettings} />);

    fireEvent.mouseDown(screen.getAllByRole('combobox')[index]);
    fireEvent.click(screen.getByRole('option', { name: option }));

    expect(setSettings).toHaveBeenCalledWith({ ...settings, ...update });
  });
});
