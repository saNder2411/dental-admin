import styled from 'styled-components';

export const SchedulerItemTopWrapper = styled.div`
  margin-top: 0.1rem;
  margin-left: 0.1rem;
  text-align: center;
  margin-right: -0.4rem;
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(255, 255, 255, 0.5);

  & .SchedulerItem__icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-left: 4px;

    & .SchedulerItem__icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      margin-right: 4px;
      margin-bottom: 4px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 1);

      & svg {
        width: 50%;
        height: 50%;
      }
    }

    & .SchedulerItem__icon:after {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }
`;
