import styled from 'styled-components';

export const SchedulerItemTopWrapper = styled.div`
  margin-top: 0.1rem;
  margin-left: 0.1rem;
  text-align: center;
  margin-right: -0.4rem;
  padding-bottom: 0.4rem;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(255, 255, 255, 0.5);

  & .SchedulerItem__icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & .SchedulerItem__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      margin-bottom: 2px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 1);

      /* & svg {
        width: 26px;
        height: 26px;
      } */
    }

    & .SchedulerItem__icon:first-of-type {
      margin-right: 0.2rem;
    }
  }
`;
