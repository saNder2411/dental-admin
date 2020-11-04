import styled from 'styled-components';

export const Grid = styled.section`
  .Grid__addNewItemWrapper {
    display: inline-flex;
    float: left;
    align-items: center;

    & .Grid__addNewItemTitle {
      font-weight: bold;
      margin-left: 20px;
      margin-right: 6px;
    }

    button.k-button {
      background: transparent;
      border: none;
      padding: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;

      .k-i-plus-circle {
        color: #44af8e;
        font-size: 1.7rem;
      }
    }
  }
`;
