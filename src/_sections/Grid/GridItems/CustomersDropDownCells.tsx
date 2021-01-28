import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../_bus/_Customers/CustomersTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Selectors
import { selectProcessDataItemFieldValue, selectStaffForDropDownListData, selectStaffLastNameByID } from '../../../_bus/Entities/EntitiesSelectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const CustomersSvcStaffDropDownList: FC<EditCellProps<CustomerDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const value = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, number>(dataItemID, EntitiesKeys.Customers, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectStaffDropDownListData = useMemo(selectStaffForDropDownListData, []);
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
  const value = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, { results: number[] }>(dataItemID, EntitiesKeys.Customers, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectServicesDropDownListData = useMemo(selectStaffForDropDownListData, []);
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

export const CustomersGenderDropDownList: FC<EditCellProps<CustomerDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, string>(dataItemID, EntitiesKeys.Customers, field));
  const dataForDropDownList = [
    { text: '(1) Female', value: '(1) Female' },
    { text: '(2) Male', value: '(2) Male' },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onGenderChange = onGridDropDownChange<CustomerDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onGenderChange} value={dropDownListValue} data={dataForDropDownList} textField="text" disabled={isDataItemLoading} />
  );
};
