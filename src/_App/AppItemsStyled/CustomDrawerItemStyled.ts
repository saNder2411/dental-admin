import styled from 'styled-components';
// SVG
import Dashboard from '../../_assets/dashboard-icon.svg';
import TeamStaff from '../../_assets/profile-icon.svg';
import Agenda from '../../_assets/house.svg';

export const CustomDrawerItem = styled.div`
  .k-drawer-item {
    user-select: none;
    align-items: center;

    &:not(.k-drawer-separator) {
      padding: 16px 8px;
    }

    .k-icon {
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      width: 25px;
      height: 25px;
      font-size: 1.7rem;

      &.dashboard-icon {
        mask-image: url(${Dashboard});
        margin-top: 2px;
        margin-left: 7px;
        background-color: #656565;
      }
      
      &.profile-icon {
        mask-image: url(${TeamStaff});
        margin-left: 9px;
        background-color: #656565;
      }

      &.home-icon {
        mask-image: url(${Agenda});
        margin-left: 9px;
        background-color: #656565;
      }
    }

    &.k-state-selected .k-icon {
      &.dashboard-icon,
      &.profile-icon,
      &.home-icon {
        background-color: #ffffff;
      }
    }
  }
`;
