import React, { FC } from 'react';
import { Loader as KendoLoader } from '@progress/kendo-react-indicators';

interface Props {
  isLoading: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'converging-spinner' | 'pulsing' | 'infinite-spinner';
  themeColor?: 'info' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'dark' | 'light' | 'inverse';
}

export const Loader: FC<Props> = ({
  isLoading,
  size = 'medium',
  type = 'converging-spinner',
  themeColor = 'info',
  className = '',
}): JSX.Element | null => {
  return isLoading ? (
    <KendoLoader size={size} type={type} themeColor={themeColor} className={`d-flex justify-content-center align-items-center ${className}`} />
  ) : null;
};

interface LoaderDataItemProps {
  isLoading: boolean;
}

export const LoaderDataItem: FC<LoaderDataItemProps> = ({ isLoading }) =>
  isLoading ? (
    <div className="position-absolute w-100 h-100 d-flex z-index-3 DataItemLoader">
      <Loader className="m-auto" isLoading={isLoading} size={'large'} type="converging-spinner" />
    </div>
  ) : null;
