import React, { FC } from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';

export const DateCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const intlService = useInternationalization();
  const value = new Date(dataItem[field] as string);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value: value?.toISOString() });

  return (
    <td>
      {dataItem.inEdit ? (
        <GridCellDecoratorWithDataItemLoadingState>
          <DateTimePicker value={value} onChange={onDateChange} />
        </GridCellDecoratorWithDataItemLoadingState>
      ) : (
        intlService.formatDate(value, 'H:mm | dd.MM')
      )}
    </td>
  );
};
