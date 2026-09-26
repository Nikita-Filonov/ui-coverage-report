import { fireEvent, render, screen } from '@testing-library/react';
import { BaseModal } from './BaseModal';

describe('BaseModal', () => {
  it('lets the caller handle cancellation without changing open state', () => {
    const onCancel = vi.fn();
    const setModal = vi.fn();
    render(
      <BaseModal title="Confirm" modal={true} setModal={setModal} onCancel={onCancel}>
        Content
      </BaseModal>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledOnce();
    expect(setModal).not.toHaveBeenCalled();
  });
});
