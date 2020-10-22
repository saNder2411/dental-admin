import styled from 'styled-components';

interface EmployeeCardProps {
  isFiltered: boolean;
  cardColor: string;
}

export const EmployeeCard = styled.div<EmployeeCardProps>`
  opacity: ${({ isFiltered }) => (isFiltered ? 0.5 : 1)};

  & .k-card {
    border-width: 0;
    cursor: pointer;
  }

  & .k-avatar.k-avatar-circle.k-avatar-image {
    width: 46px;
    height: 46px;

    img {
      display: inline-block;
      width: 43px;
      height: 43px;
      border-radius: 50%;
      border-width: 2px;
      border-style: solid;
      vertical-align: middle;
      line-height: 32px;
      box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0, 0, 0, 0.2);
      margin-left: 5px;
      border-color: ${({ cardColor }) => cardColor};
    }
  }

  & .k-card-title {
    color: ${({ cardColor }) => cardColor};
  }
`;
