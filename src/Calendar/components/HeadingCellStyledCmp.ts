import styled from 'styled-components';

interface HeadingCellProps {
  cardColor: string;
}

export const HeadingCell = styled.div<HeadingCellProps>`
  & .k-card {
    border-width: 0;
  }

  & .k-avatar.k-avatar-circle.k-avatar-image {
    width: 36px;
    height: 36px;

    img {
      display: inline-block;
      width: 32px;
      height: 32px;
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
