import { capitalizeFirstLetter, countNotNullValues, hexToRGBA } from './Core';

describe('core formatting', () => {
  it.each([
    ['primary', 'Primary'],
    ['', ''],
    ['Already capitalized', 'Already capitalized']
  ])('capitalizes %s', (input, expected) => {
    expect(capitalizeFirstLetter(input)).toBe(expected);
  });

  it.each([
    ['#ff8000', 0.5, 'rgba(255, 128, 0, 0.5)'],
    ['000000', 0, 'rgba(0, 0, 0, 0)'],
    ['#FFFFFF', 1, 'rgba(255, 255, 255, 1)']
  ])('converts %s to an RGBA color', (hex, alpha, expected) => {
    expect(hexToRGBA(hex, alpha)).toBe(expected);
  });

  it('counts enabled features and ignores disabled or missing values', () => {
    expect(countNotNullValues({ config: true, agent: false, history: null, coverage: undefined })).toBe(1);
    expect(countNotNullValues({})).toBe(0);
  });
});
