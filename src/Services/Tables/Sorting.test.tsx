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
});
