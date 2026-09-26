import { ActionType } from '../Models/Actions';
import { ElementCoverage } from '../Models/Coverage/Coverage';
import { SelectorType } from '../Models/Selector';
import { filterElementCoverageByActions } from './Coverage';

describe('filterElementCoverageByActions', () => {
  const elements: ElementCoverage[] = [
    {
      selector: '#save',
      selectorType: SelectorType.CSS,
      actions: [
        { type: ActionType.Click, count: 2 },
        { type: ActionType.Visible, count: 1 }
      ],
      history: [
        {
          createdAt: '2025-01-01T00:00:00Z',
          actions: [
            { type: ActionType.Click, count: 1 },
            { type: ActionType.Visible, count: 1 }
          ]
        }
      ]
    },
    {
      selector: '#hidden',
      selectorType: SelectorType.CSS,
      actions: [{ type: ActionType.Hidden, count: 1 }],
      history: [{ createdAt: '2025-01-01T00:00:00Z', actions: [{ type: ActionType.Hidden, count: 1 }] }]
    }
  ];

  it('keeps selected actions in the element and its history', () => {
    const result = filterElementCoverageByActions({ elements, actions: [ActionType.Click] });

    expect(result).toEqual([
      {
        selector: '#save',
        selectorType: SelectorType.CSS,
        actions: [{ type: ActionType.Click, count: 2 }],
        history: [{ createdAt: '2025-01-01T00:00:00Z', actions: [{ type: ActionType.Click, count: 1 }] }]
      }
    ]);
    expect(elements[0].actions).toHaveLength(2);
    expect(elements[0].history[0].actions).toHaveLength(2);
  });

  it('returns no elements when no actions are selected', () => {
    expect(filterElementCoverageByActions({ elements, actions: [] })).toEqual([]);
  });
});
