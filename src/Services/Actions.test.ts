import { ActionType } from '../Models/Actions';
import { getActionsChartData, normalizeActionType } from './Actions';

describe('action presentation', () => {
  it('formats action names for filter labels', () => {
    expect(normalizeActionType(ActionType.Click)).toBe('Click');
    expect(normalizeActionType(ActionType.Unchecked)).toBe('Unchecked');
  });

  it('maps action counts and timestamp to chart data', () => {
    const result = getActionsChartData({
      createdAt: '2025-01-01T10:00:00Z',
      actions: [
        { type: ActionType.Click, count: 2 },
        { type: ActionType.Hover, count: 1 }
      ]
    });

    expect(result).toEqual({ createdAt: new Date('2025-01-01T10:00:00Z'), CLICK: 2, HOVER: 1 });
  });
});
