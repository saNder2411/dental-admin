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
  & .grid__icon {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
`;

export const ServicesIconCell = styled(StatusIcon)`
  & .grid__icon {
    width: 40px;
    height: 40px;
  }
`;

export const ServicesImageCell = styled.td<{ imageUrl: string }>`

  & .Grid__serviceImage {
    margin: auto;
    width: 40px;
    height: 40px;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const PhotoCell = styled.td<{ imageUrl: string }>`
  && {
    padding: 20;
  }

  & .Grid__avatar {
    margin: auto;
    width: 90px;
    height: 90px;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const BooleanFlagCell = styled.td<{ isOnline: boolean }>`
  & span {
    display: block;
    margin: auto;
    font-size: 2rem;
    color: ${({ isOnline }) => (isOnline ? '#28a745 ' : '#dc3545')};
  }
`;

export const ActionsControlCell = styled.td`
  && button {
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  && span {
    display: block;
    margin: auto;
    font-size: 2rem;
  }

  .k-i-edit {
    color: #4db5c8;
  }

  .k-i-reload,
  .k-i-checkmark {
    color: #28a745;
  }

  .k-i-trash,
  .k-i-x {
    color: #dc3545;
  }
`;

export const ReferenceCell = styled.td`
  cursor: pointer;
`;
