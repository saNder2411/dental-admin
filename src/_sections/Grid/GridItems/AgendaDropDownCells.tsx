import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DropDownList,
  MultiSelect,
  ComboBox,
  MultiSelectChangeEvent,
  ComboBoxChangeEvent,
  ComboBoxFilterChangeEvent,
} from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem, StatusNames } from '../../../_bus/_Appointments/AppointmentsTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Selectors
import {
  selectProcessDataItemFieldValue,
  selectStaffForDropDownListData,
  selectStaffLastNameByID,
  selectCustomersForDropDownListData,
  selectCustomersById,
  selectCustomerFullNameByID,
  selectServicesForDropDownListData,
} from '../../../_bus/Entities/EntitiesSelectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Hooks
import { useTextFieldsValidation } from '../GridHooks';
// Helpers
import { onGridDropDownChange, EmptyDropDownListDataItem } from './GridItemsHelpers';
import { setTitleProp } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';
// Const
import { statusNameList } from '../../../_bus/Constants';

export const AgendaStatusDropDownList: FC<EditCellProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, StatusNames>(dataItemID, EntitiesKeys.Appointments, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const dataForDropDownList = statusNameList.map((value) => ({ text: value, value }));
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onStatusChange = onGridDropDownChange<AppointmentDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onStatusChange} value={dropDownListValue} data={dataForDropDownList} textField="text" disabled={isDataItemLoading} />
  );
};

export const AgendaSvcStaffDropDownList: FC<EditCellProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, EntitiesKeys.Appointments, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectStaffDropDownListData = useMemo(selectStaffForDropDownListData, []);
  const dataForDropdownList = useSelector(selectStaffDropDownListData);
  const memoDropDownListData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const selectStaffLastName = useMemo(() => selectStaffLastNameByID(value), [value]);
  const staffLastName = useSelector(selectStaffLastName);
  const dropDownListValue = { text: staffLastName, value };

  const onSvcStaffChange = onGridDropDownChange<AppointmentDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={memoDropDownListData} textField="text" disabled={isDataItemLoading} />
  );
};

export const AgendaFullNameDropDownList: FC<EditCellProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, EntitiesKeys.Appointments, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const [filter, setFilter] = useState('');
  const selectCustomerDropDownListData = useMemo(selectCustomersForDropDownListData, []);
  const dataForDropdownList = useSelector(selectCustomerDropDownListData);
  const memoDropDownListData = useMemo(() => dataForDropdownList, [dataForDropdownList]);

  const filteredDataForDropDownList = !filter
    ? memoDropDownListData
    : memoDropDownListData.filter(({ text }) => text.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);

  const selectCustomerFullName = useMemo(() => selectCustomerFullNameByID(value), [value]);
  const customerFullName = useSelector(selectCustomerFullName);
  const dropDownListValue = { text: customerFullName, value };

  const selectCustomers = useMemo(() => selectCustomersById, []);
  const customersById = useSelector(selectCustomers);

  const isValid = useTextFieldsValidation(dropDownListValue.text);

  const onFullNameChange = (evt: ComboBoxChangeEvent) => {
    const evtValue = evt.value ? evt.value : EmptyDropDownListDataItem;
    const selectedCustomer = customersById[evtValue.value];
    const newTitle = selectedCustomer ? setTitleProp(selectedCustomer.FirstName ?? '', selectedCustomer.Title ?? '', dataItemID) : '';

    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: evtValue.value });
    onChange({ dataItem: dataItemID, field: 'Title', syntheticEvent: evt.syntheticEvent, value: newTitle });
  };

  const onFilterChange = (evt: ComboBoxFilterChangeEvent) => setFilter(evt.filter.value);

  return (
    <ComboBox
      onChange={onFullNameChange}
      onFilterChange={onFilterChange}
      value={dropDownListValue}
      data={filteredDataForDropDownList}
      textField="text"
      dataItemKey="value"
      filterable
      disabled={isDataItemLoading}
      valid={isValid}
      placeholder="This field is required."
    />
  );
};

export const AgendaServicesMultiSelect: FC<EditCellProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(
    selectProcessDataItemFieldValue<AppointmentDataItem, { results: number[] }>(dataItemID, EntitiesKeys.Appointments, field)
  );
  const selectServicesDropDownListData = useMemo(selectServicesForDropDownListData, []);
  const dataForDropdownList = useSelector(selectServicesDropDownListData);
  const memoMultiSelectData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const multiSelectValue = memoMultiSelectData.filter((item) => value.results.find((ID) => ID === item.value));

  const onValueChange = (evt: MultiSelectChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: { results: evt.target.value.map(({ value }) => value) } });

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={memoMultiSelectData} textField="text" disabled={isDataItemLoading} />;
};
