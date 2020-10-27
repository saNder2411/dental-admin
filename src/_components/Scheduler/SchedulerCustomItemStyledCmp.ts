import styled from 'styled-components';

export const SchedulerItemTopWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.4rem;
  margin-left: 0.5rem;
  margin-bottom: 0.4rem;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(255, 255, 255, 0.5);

  & .SchedulerItem__icons {
    display: flex;
    justify-content: end;
    margin-left: auto;
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

    & .SchedulerItem__icon:not(:last-of-type) {
      margin-right: 0.3rem;
    }
  }
`;
