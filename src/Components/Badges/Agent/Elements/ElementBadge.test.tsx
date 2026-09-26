import { render, screen } from '@testing-library/react';
import { ActionType } from '../../../../Models/Actions';
import { AgentBadgeContentType } from '../../../../Models/Agent';
import { Color } from '../../../../Models/Core';
import { ElementBadge } from './ElementBadge';

describe('ElementBadge', () => {
  const actions = [
    { type: ActionType.Click, count: 3 },
    { type: ActionType.Hover, count: 2 }
  ];

  it('shows the total action count when configured', () => {
    render(
      <ElementBadge
        actions={actions}
        settings={{
          badgeColor: Color.Primary,
          overlayColor: Color.Error,
          badgeContentType: AgentBadgeContentType.TotalNumberOfActions
        }}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows the number of action types when configured', () => {
    render(
      <ElementBadge
        actions={actions}
        settings={{
          badgeColor: Color.Primary,
          overlayColor: Color.Error,
          badgeContentType: AgentBadgeContentType.TotalNumberOfActionTypes
        }}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
