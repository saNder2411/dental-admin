import styled from 'styled-components';

interface Props {
  isFiltered: boolean;
  cardColor: string;
}

export const CalendarTopControlItem = styled.div<Props>`
  opacity: ${({ isFiltered }) => (isFiltered ? 0.5 : 1)};
  color: ${({ cardColor }) => cardColor};
  cursor: pointer;
  margin-right: 28px;

  & .employee-control__title {
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  & .icon-toggle {
    width: 24px;
    height: 24px;
    margin: auto;
    border-radius: 50%;
    border: 4px solid ${({ cardColor }) => cardColor};
    box-shadow: inset 0 0 1px #999, inset 0 0 6px ${({isFiltered }) => (isFiltered ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)')};
    background-color: ${({ cardColor, isFiltered }) => (isFiltered ? 'none' : cardColor)};
  }
`;
