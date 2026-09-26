import { act, renderHook } from '@testing-library/react';
import { useTableSorting } from './Sorting';

describe('useTableSorting', () => {
  const items = [
    { name: 'Beta', metrics: { actions: 3 } },
    { name: 'Alpha', metrics: { actions: 1 } }
  ];

  it('sorts nested values in both directions without mutating source items', () => {
    const { result } = renderHook(() => useTableSorting({ items }));

    expect(result.current.sortedItems.map((item) => item.name)).toEqual(['Beta', 'Alpha']);

    act(() => result.current.setOrderBy('metrics.actions'));
    expect(result.current.sortedItems.map((item) => item.name)).toEqual(['Alpha', 'Beta']);

    act(() => result.current.setOrderDirection('desc'));
    expect(result.current.sortedItems.map((item) => item.name)).toEqual(['Beta', 'Alpha']);
    expect(items.map((item) => item.name)).toEqual(['Beta', 'Alpha']);
  });

  it('keeps equal and missing values in their original order', () => {
    const items = [
      { name: 'Missing' },
      { name: 'Zero', metrics: { actions: 0 } },
      { name: 'First', metrics: { actions: 2 } },
      { name: 'Second', metrics: { actions: 2 } }
    ];
    const { result } = renderHook(() => useTableSorting({ items }));

    act(() => result.current.setOrderBy('metrics.actions'));
    expect(result.current.sortedItems.map((item) => item.name)).toEqual(['Missing', 'Zero', 'First', 'Second']);

    act(() => result.current.setOrderDirection('desc'));
    expect(result.current.sortedItems.map((item) => item.name)).toEqual(['First', 'Second', 'Missing', 'Zero']);
  });
});
