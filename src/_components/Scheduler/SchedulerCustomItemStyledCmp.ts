import styled from 'styled-components';

export const SchedulerItemTopWrapper = styled.div`
  display: flex;
  align-items: center;

  & .SchedulerItem__icons {
    display: flex;
    width: 100px;
    justify-content: space-around;
    margin-left: auto;
    margin-right: 4px;
    margin-top: 4px;
    font-size: 1rem;
    padding: 4px;

    & .SchedulerItem__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 1);
    }
  }
`;
