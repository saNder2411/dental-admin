import React, { FC } from 'react';
import { TimeHeaderCell, TimeHeaderCellProps, DateHeaderCell, DateHeaderCellProps } from '@progress/kendo-react-scheduler';

export const CustomTimeHeaderCell: FC<TimeHeaderCellProps> = (props) => <TimeHeaderCell {...props} format={'HH:mm'} />;

export const CustomDateHeaderCell: FC<DateHeaderCellProps> = (props) => <DateHeaderCell {...props} format={'EEEEE'} />;
