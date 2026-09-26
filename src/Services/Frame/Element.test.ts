import { SelectorType } from '../../Models/Selector';
import { getElement } from './Element';

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
  });
});
