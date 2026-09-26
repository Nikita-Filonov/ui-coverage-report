import { getActionMarginRight } from './Views';

describe('getActionMarginRight', () => {
  it('adds spacing between actions but leaves the last action flush', () => {
    const actions = ['refresh', 'clear'];

    expect(getActionMarginRight({ index: 0, margin: 2, actions })).toBe(2);
    expect(getActionMarginRight({ index: 1, margin: 2, actions })).toBe(0);
  });

  it('uses the requested margin when no action list is provided', () => {
    expect(getActionMarginRight({ index: 0, margin: 3 })).toBe(3);
  });
});
