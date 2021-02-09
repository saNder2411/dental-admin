import styled, { css } from 'styled-components';

export const GenericCurrencyCell = styled.td<{ isNegativeAmount: boolean }>`
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
  && button.k-button.btn-custom {
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  && span.custom-icon {
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

export const AgendaValidDatePopup = styled.div`
  position: relative;
  margin: 0 -6px;

  & .popupControl {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    cursor: pointer;
    font-size: 90%;
    font-weight: 700;
    text-align: center;
    color: rgb(209, 209, 217);
    text-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background: linear-gradient(rgb(110, 112, 120), rgb(81, 81, 86)) rgb(110, 112, 120);
    box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset, 0 3px 5px rgba(0, 1, 6, 0.5), 0 0 1px 1px rgba(0, 1, 6, 0.2);
    transition: 0.2s ease-in-out;
  }

  & .popupControl:hover:not(:active) {
    background: linear-gradient(rgb(126, 126, 134), rgb(70, 71, 76)) rgb(126, 126, 134);
  }

  & .popupControl:active {
    background: linear-gradient(rgb(76, 77, 82), rgb(56, 57, 62)) rgb(76, 77, 82);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5) inset, 0 2px 3px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(255, 255, 255, 0.1);
  }
`;
