import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
// Components
// import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
// Types
import { GridDataItem } from '../GridTypes';
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectCustomersMemoFullNameList } from '../../../Customers/CustomersSelectors';
// import { selectServicesMemoData } from '../../../Services/ServicesSelectors';
// import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
import { selectAgendaMemoStatusNameList } from '../../../Agenda/AgendaSelectors';
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Helpers
import { onGridDropDownChange } from './GridComponentsHelpers';

interface AgendaDropDownListProps<T = string, U = GridDataItem> extends GridCellProps<AgendaDataItem> {
  value: T;
  domainData?: U[];
  
}

export const AgendaStatusDropDownList: FC<AgendaDropDownListProps<StatusNames>> = ({ dataItem, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const selectStatusNameList = useMemo(selectAgendaMemoStatusNameList, []);
  const statusNameList = useSelector(selectStatusNameList);
  const dataForDropDownList = statusNameList.map((value) => ({ [field]: value, value }));
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);
  const onStatusChange = onGridDropDownChange<AgendaDataItem>(dataItem, field, onChange);

  return (
    <DropDownList onChange={onStatusChange} value={dropDownListValue} data={dataForDropDownList} textField={field} disabled={isDataItemLoading} />
  );
};

export const AgendaSvcStaffDropDownList: FC<AgendaDropDownListProps<string, TeamStaffDataItem>> = ({ dataItem, field, onChange, domainData, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const dataForDropdownList = domainData ? domainData.map(({ FullName, Id, __metadata }) => {
    const value = FullName.split(' ').slice(-1)[0];
    const startGuid = __metadata.id.indexOf(`'`) + 1;
    const endGuid = __metadata.id.lastIndexOf(`'`);
    const id = __metadata.id.slice(startGuid, endGuid);

    return {
      [field]: value,
      value,
      meta: {
        Id,
        __metadata: {
          id,
          type: __metadata.type,
        },
      },
    };
  }) : [];
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

export const AgendaFullNameDropDownList: FC<AgendaDropDownListProps> = ({ dataItem, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const selectCustomersFullNameList = useMemo(selectCustomersMemoFullNameList, []);
  const customersFullNameList = useSelector(selectCustomersFullNameList);
  const dataForDropDownList = customersFullNameList.map((value) => ({ [field]: value, value }));
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);
  const onFullNameChange = onGridDropDownChange<AgendaDataItem>(dataItem, field, onChange);

  return (
    <DropDownList onChange={onFullNameChange} value={dropDownListValue} data={dataForDropDownList} textField={field} disabled={isDataItemLoading} />
  );
};