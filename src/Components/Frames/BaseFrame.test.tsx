import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { BaseFrame } from './BaseFrame';

describe('BaseFrame', () => {
  it('shows an empty state until an app URL is available', () => {
    const frameRef = createRef<HTMLIFrameElement>();
    const { container, rerender } = render(<BaseFrame src="" frameRef={frameRef} />);

    expect(screen.getByText('No frame source provided')).toBeInTheDocument();
    expect(container.querySelector('iframe')).toBeNull();

    rerender(<BaseFrame src="https://app.example.com" frameRef={frameRef} />);

    expect(container.querySelector('iframe')).toHaveAttribute('src', 'https://app.example.com');
    expect(frameRef.current).toBe(container.querySelector('iframe'));
  });
});
