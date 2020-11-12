import React, { FC } from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';

export const DateCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const intlService = useInternationalization();
  const value = new Date(dataItem[field] as number | Date);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value });

  return <td>{dataItem.inEdit ? <DateTimePicker value={value} onChange={onDateChange} /> : intlService.formatDate(value, 'H:mm | dd.MM')}</td>;
};
