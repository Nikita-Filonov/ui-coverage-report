import { BaseModal } from '../BaseModal';
import { FC } from 'react';
import { FeaturesView } from '../../../Views/Features/FeaturesView';

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

export const FeaturesModal: FC<Props> = ({ modal, setModal }) => {
  return (
    <BaseModal title={'Features'} modal={modal} setModal={setModal}>
      <FeaturesView />
    </BaseModal>
  );
};
