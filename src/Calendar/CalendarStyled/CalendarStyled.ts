import styled from 'styled-components';

export const Calendar = styled.section`
  min-width: 1500px;

  && .grid {
    grid-template-columns: repeat(5, 1fr);
  }

  & .DataItemLoader {
    z-index: 2;
    background-color: rgba(246, 246, 246, 0.4);
  }

  & .card-title {
    margin-top: auto;
    margin-bottom: auto;
  }

  .card-control-wrapper {
    display: flex;
    grid-column-start: 3;
    grid-row-start: 1;
  }

  & .Calendar__addNewItemWrapper {
    display: flex;
    grid-column-start: 4;
    grid-column-end: 6;
    grid-row-start: 1;
    justify-content: flex-end;
    align-items: center;

    & .Calendar__addNewItemTitle {
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
