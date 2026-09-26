import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BaseInfoRowView } from './BaseInfoRowView';

describe('BaseInfoRowView', () => {
  const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

  afterEach(() => {
    if (clipboardDescriptor) Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
    else Reflect.deleteProperty(navigator, 'clipboard');
  });

  it('copies the displayed value to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<BaseInfoRowView name="Selector" value="#save" />);

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#save'));
  });

  it('hides the copy action when copying is disabled', () => {
    render(<BaseInfoRowView name="Selector" value="#save" allowCopy={false} />);

    expect(screen.getByText('Selector: #save')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
