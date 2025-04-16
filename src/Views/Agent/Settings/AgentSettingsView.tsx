import Box from '@mui/material/Box';
import { BoxView } from '../../../Components/Views/BoxView';
import { ColorSelect } from '../../../Components/Selects/Core/ColorSelect';
import { AgentSettings } from '../../../Models/Agent';
import { FC } from 'react';
import { Color } from '../../../Models/Core';

type Props = {
  settings: AgentSettings;
  setSettings: (settings: AgentSettings) => void;
};

export const AgentSettingsView: FC<Props> = ({ settings, setSettings }) => {
  const onBadgeColor = (badgeColor: Color) => setSettings({ ...settings, badgeColor });

  const onOverlayColor = (overlayColor: Color) => setSettings({ ...settings, overlayColor });

  return (
    <Box>
      <BoxView title={'Style'} containerSx={{ mt: 0 }}>
        <ColorSelect label={'Badge color'} color={settings.badgeColor} setColor={onBadgeColor} />
        <ColorSelect label={'Overlay color'} color={settings.overlayColor} setColor={onOverlayColor} />
      </BoxView>
    </Box>
  );
};
