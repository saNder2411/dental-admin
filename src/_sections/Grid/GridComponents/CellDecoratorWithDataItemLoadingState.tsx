import React, { Children, cloneElement, ReactElement } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';

interface Props {
  children: ReactElement;
}

export const CellDecoratorWithDataItemLoadingState = ({ children }: Props): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  return <>{Children.map(children, (child) => cloneElement(child, { disabled: isDataItemLoading }))}</>;
};
