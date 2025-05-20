import { BaseToolbarView } from './BaseToolbarView';
import TuneIcon from '@mui/icons-material/Tune';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useTheme } from '../../Providers/ThemeProvider';
import { ThemeMode } from '../../Models/Theme';
import { LogoImage } from '../Images/LogoImage';
import { AppConfigSelectionPopover } from '../Popovers/Config/AppConfigSelectionPopover';
import { Fragment, useState } from 'react';
import { FeaturesModal } from '../Modals/Features/FeaturesModal';
import { useFeatures } from '../../Providers/FeaturesProvider';
import { countNotNullValues } from '../../Services/Core';

export const AppToolbarView = () => {
  const { features } = useFeatures();
  const { themeMode, onThemeMode } = useTheme();
  const [featuresModal, setFeaturesModal] = useState(false);

  const onFeatures = () => setFeaturesModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        icon={<LogoImage width={32} height={32} />}
        title={'UI coverage report'}
        actions={[
          { content: <AppConfigSelectionPopover /> },
          { icon: <TuneIcon />, onClick: onFeatures, badgeContent: countNotNullValues(features) },
          {
            icon: themeMode === ThemeMode.Dark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />,
            onClick: onThemeMode
          }
        ]}
        containerSx={{ mt: 3 }}
      />
      <FeaturesModal modal={featuresModal} setModal={setFeaturesModal} />
    </Fragment>
  );
};
