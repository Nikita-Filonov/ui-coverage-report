import { BaseModal } from '../../BaseModal';
import { ElementDetailsView } from '../../../../Views/Agent/Elements/ElementDetailsView';
import { FC } from 'react';
import { ElementCoverage } from '../../../../Models/Coverage/Coverage';

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  element: ElementCoverage;
};

export const ElementDetailsModal: FC<Props> = ({ modal, setModal, element }) => {
  return (
    <BaseModal title={'Element details'} modal={modal} setModal={setModal} maxWidth={'md'}>
      <ElementDetailsView element={element} />
    </BaseModal>
  );
};
