import { SelectorType } from '../../Models/Selector';
import { act, renderHook } from '@testing-library/react';
import { AgentBadgeContentType, AgentSettings } from '../../Models/Agent';
import { Color } from '../../Models/Core';
import { getElement, useElement } from './Element';

describe('getElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="save">Save</button>';
  });

  it('finds the same visual element by CSS and XPath', () => {
    const button = document.getElementById('save');

    expect(getElement({ type: SelectorType.CSS, value: '#save' })).toBe(button);
    expect(getElement({ type: SelectorType.XPath, value: '//*[@id="save"]' })).toBe(button);
  });

  it('returns null when a selector does not match', () => {
    expect(getElement({ type: SelectorType.CSS, value: '#missing' })).toBeNull();
    expect(getElement({ type: SelectorType.XPath, value: '//*[@id="missing"]' })).toBeNull();
  });

  it('finds SVG elements and ignores nonvisual XPath results', () => {
    document.body.innerHTML = '<svg id="icon"></svg><p>Text</p>';

    expect(getElement({ type: SelectorType.CSS, value: '#icon' })).toBe(document.getElementById('icon'));
    expect(getElement({ type: SelectorType.XPath, value: '//p/text()' })).toBeNull();
    expect(getElement({ type: 'unsupported' as SelectorType, value: '#icon' })).toBeNull();
  });
});

describe('useElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="save">Save</button>';
  });

  it('highlights the element, updates its color and cleans up on unmount', () => {
    const settings: AgentSettings = {
      overlayColor: Color.Error,
      badgeColor: Color.Primary,
      badgeContentType: AgentBadgeContentType.TotalNumberOfActions
    };
    const { result, rerender, unmount } = renderHook(
      ({ settings }) => useElement({ type: SelectorType.CSS, value: '#save', settings }),
      { initialProps: { settings } }
    );
    const button = document.getElementById('save')!;

    expect(result.current.node).toBe(button);
    expect(button.style.backgroundColor).toBe('rgba(211, 47, 47, 0.1)');

    rerender({ settings: { ...settings, overlayColor: Color.Success } });
    expect(button.style.backgroundColor).toBe('rgba(76, 175, 80, 0.1)');

    unmount();
    expect(button.style.outline).toBe('');
    expect(button.style.backgroundColor).toBe('');
  });

  it('uses the default color and tolerates a missing element', () => {
    const { result, rerender } = renderHook(({ value }) => useElement({ type: SelectorType.CSS, value }), {
      initialProps: { value: '#save' }
    });
    expect(result.current.node?.style.backgroundColor).toBe('rgba(25, 118, 210, 0.1)');

    act(() => rerender({ value: '#missing' }));
    expect(result.current.node).toBeNull();
  });
});
