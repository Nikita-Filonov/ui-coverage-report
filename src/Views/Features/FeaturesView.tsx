import { Box } from '@mui/material';
import { BaseCheckbox } from '../../Components/Checkboxes/BaseCheckbox';
import { useFeatures } from '../../Providers/FeaturesProvider';
import { ClearAllButton } from '../../Components/Buttons/ClearAllButton';

export const FeaturesView = () => {
  const { features, setFeatures, clearAllFeatures } = useFeatures();

  const onFeature = (key: string) => (value: boolean) => setFeatures({ ...features, [key]: value });

  return (
    <Box>
      <BaseCheckbox
        label={'Config view'}
        checked={features.configView}
        onChange={onFeature('configView')}
        containerSx={{ mt: 0 }}
      />
      <BaseCheckbox
        label={'Coverage history view'}
        checked={features.coverageHistoryView}
        onChange={onFeature('coverageHistoryView')}
      />
      <BaseCheckbox label={'Agent view'} checked={features.agentView} onChange={onFeature('agentView')} />
      <BaseCheckbox
        label={'Element coverage view'}
        checked={features.elementCoverageView}
        onChange={onFeature('elementCoverageView')}
      />
      <ClearAllButton onClick={clearAllFeatures} />
    </Box>
  );
};
