import styled from 'styled-components';

export const Calendar = styled.section`
  min-width: 1500px;

  && .grid {
    grid-template-columns: repeat(5, 1fr);
  }

  & .card-container {
    grid-template-columns: repeat(1, 1fr);
  }

  & .card-title {
    grid-column: 1 / -1;
    text-align: left;
  }

  & .k-card-header {
    border: none;
  }

  & .k-hbox {
    padding: 0 20px;
    background: transparent;
  }

  & .k-avatar {
    width: 41px;
    height: 41px;
  }

  & .k-card-title {
    font-size: 15px;
    margin-bottom: -6px;
    text-align: left;
  }

  & .k-card-subtitle {
    margin-top: 0;
    text-transform: uppercase;
    font-size: 11px;
  }
  
  & .disabled {
    opacity: 0.5;
  }

  & .SchedulerItemContent__item {
    margin-bottom: 0.5rem;
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
