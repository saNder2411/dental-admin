import styled from 'styled-components';

interface EmployeeControlBtnProps {
  isFiltered: boolean;
  cardColor: string;
}

export const EmployeeControlBtn = styled.div<EmployeeControlBtnProps>`
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
    width: 20px;
    height: 20px;
    margin: auto;
    border-radius: 50%;
    border: 2px solid ${({ cardColor }) => cardColor};
    box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0, 0, 0, 0.7);
    background-color: ${({ cardColor }) => cardColor};
  }
`;
