import { fireEvent, render, screen } from '@testing-library/react';
import { BaseTableHeader } from './BaseTableHeader';

describe('BaseTableHeader', () => {
  it.each([
    ['asc', 'desc'],
    ['desc', 'asc']
  ] as const)('changes the sort direction from %s to %s', (orderDirection, expected) => {
    const setOrderBy = vi.fn();
    const setOrderDirection = vi.fn();
    render(
      <table>
        <BaseTableHeader
          cells={[
            { value: 'Name', orderKey: 'name' },
            { value: 'Description', align: 'right' }
          ]}
          orderBy="name"
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      </table>
    );

    fireEvent.click(screen.getByText('Name'));
    expect(setOrderBy).toHaveBeenCalledWith('name');
    expect(setOrderDirection).toHaveBeenCalledWith(expected);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
