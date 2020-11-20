import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
// Components
// import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
// import { selectCustomersMemoFullNameList } from '../../../Customers/CustomersSelectors';
// import { selectServicesMemoData } from '../../../Services/ServicesSelectors';
// import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Helpers
// import { onGridDropDownChange } from './GridComponentsHelpers';

interface AgendaSvcStaffDropDownListProps extends GridCellProps<AgendaDataItem> {
  teamStaffData: TeamStaffDataItem[];
  value: string;
}

export const AgendaSvcStaffDropDownList: FC<AgendaSvcStaffDropDownListProps> = ({ dataItem, field, onChange, teamStaffData, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const dataForDropdownList = teamStaffData.map(({ FullName, Id, __metadata }) => ({
    [field]: FullName.split(' ').slice(-1)[0],
    value: FullName.split(' ').slice(-1)[0],
    meta: {
      Id,
      __metadata: {
        id: __metadata.id,
        type: __metadata.type,
      },
    },
  }));
  const dropDownListValue = dataForDropdownList.find((item) => item.value === value);
  const onSvcStaffChange = (evt: DropDownListChangeEvent) => {
    onChange({
      dataItem,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: evt.target.value.meta,
    });
  };

  return (
    <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={dataForDropdownList} textField={field} disabled={isDataItemLoading} />
  );
};
