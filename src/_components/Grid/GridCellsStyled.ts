import styled, { css } from 'styled-components';
// Images

export const CurrencyCell = styled.td<{ isNegativeAmount: boolean }>`
  & span {
    ${({ isNegativeAmount }) =>
      isNegativeAmount &&
      css`
        color: #d9534f;
        font-weight: 600;
      `}
  }
`;

export const StatusIcon = styled.td`
  && {
    padding: 20;
  }

  & .grid__status-icon {
    margin: auto;
    width: 70px;
    height: 70px;
  }
`;

export const PhotoCell = styled.td<{ imageUrl: string }>`
  && {
    padding: 20;
  }

  & .grid__stylist-photo {
    margin: auto;
    width: 90px;
    height: 90px;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const FlagCell = styled.td<{ isOnline: boolean }>`
  & span {
    display: block;
    margin: auto;
    font-size: 2rem;
    color: ${({ isOnline }) => (isOnline ? '#28a745 ' : '#dc3545')};
  }
`;

export const ActionsControlCell = styled.td<{ inEdit: boolean }>`
  && button {
    ${({ inEdit }) =>
      !inEdit &&
      css`
        background: transparent;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
      `}
  }

  && span {
    display: block;
    margin: auto;
    font-size: 2rem;
  }

  .k-i-edit {
    color: #4db5c8;
  }

  .k-i-trash {
    color: #dc3545;
  }
`;
