import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../_bus/Customers/CustomersTypes';
// Selectors
import {
  selectDataItemIsLoading,
  selectProcessDataItemFieldValue,
  selectStaffDataForDropDownListData,
  selectStaffLastNameByID,
} from '../GridSelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const CustomersSvcStaffDropDownList: FC<EditCellProps<CustomerDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const value = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, number>(dataItemID, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectStaffDropDownListData = useMemo(selectStaffDataForDropDownListData, []);
  const dataForDropdownList = useSelector(selectStaffDropDownListData);
  const memoDropDownListData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const selectStaffLastName = useMemo(() => selectStaffLastNameByID(value), [value]);
  const staffLastName = useSelector(selectStaffLastName);
  const dropDownListValue = { text: staffLastName, value };

  const onSvcStaffChange = onGridDropDownChange<CustomerDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={memoDropDownListData} textField="text" disabled={isDataItemLoading} />
  );
};

export const CustomersLastAppointmentsMultiSelect: FC<EditCellProps<CustomerDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const value = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, { results: number[] }>(dataItemID, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectServicesDropDownListData = useMemo(selectStaffDataForDropDownListData, []);
  const dataForDropdownList = useSelector(selectServicesDropDownListData);
  const memoMultiSelectData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const multiSelectValue = memoMultiSelectData.filter((item) => value.results.find((ID) => ID === item.value));

  const onAppointmentChange = (evt: MultiSelectChangeEvent) => {
    onChange({
      dataItem: dataItemID,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: { results: evt.target.value.map(({ value }) => value) },
    });
  };
  return (
    <MultiSelect onChange={onAppointmentChange} value={multiSelectValue} data={memoMultiSelectData} textField="text" disabled={isDataItemLoading} />
  );
};
