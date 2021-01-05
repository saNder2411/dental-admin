import React, { FC, useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DropDownList,
  MultiSelect,
  ComboBox,
  MultiSelectChangeEvent,
  ComboBoxChangeEvent,
  ComboBoxFilterChangeEvent,
} from '@progress/kendo-react-dropdowns';
// Types
import { EditCellDropDownListProps } from './GridItemsTypes';
import { AppointmentDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectIsValidFullNameValue } from '../../../Agenda/AgendaSelectors';
import {
  selectDataItemIsLoading,
  selectProcessDataItemFieldValue,
  selectMemoStatusNameList,
  selectStaffDataForDropDownListData,
  selectStaffLastNameByID,
  selectCustomersDataForDropDownListData,
  selectCustomersByIdData,
  selectCustomerFullNameByID,
  selectServicesDataForDropDownListData,
} from '../GridSelectors';
// Actions
import { AgendaEditCellsActions } from '../../../Agenda/AgendaActions';
// Helpers
import { onGridDropDownChange, EmptyDropDownListDataItem } from './GridItemsHelpers';
import { setTitleProp } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const AgendaStatusDropDownList: FC<EditCellDropDownListProps<AppointmentDataItem, StatusNames>> = ({ dataItemID, field, onChange }) => {
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, StatusNames>(dataItemID, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectStatusNameList = useMemo(selectMemoStatusNameList, []);
  const statusNameList = useSelector(selectStatusNameList);
  const dataForDropDownList = statusNameList.map((value) => ({ text: value, value }));
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onStatusChange = onGridDropDownChange<AppointmentDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onStatusChange} value={dropDownListValue} data={dataForDropDownList} textField="text" disabled={isDataItemLoading} />
  );
};

export const AgendaSvcStaffDropDownList: FC<EditCellDropDownListProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectStaffDropDownListData = useMemo(selectStaffDataForDropDownListData, []);
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

export const AgendaFullNameDropDownList: FC<EditCellDropDownListProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const dispatch = useDispatch();
  const isValidFullName = useSelector(selectIsValidFullNameValue);
  const [filter, setFilter] = useState('');
  const selectCustomerDropDownListData = useMemo(selectCustomersDataForDropDownListData, []);
  const dataForDropdownList = useSelector(selectCustomerDropDownListData);
  const memoDropDownListData = useMemo(() => dataForDropdownList, [dataForDropdownList]);

  const filteredDataForDropDownList = !filter
    ? memoDropDownListData
    : memoDropDownListData.filter(({ text }) => text.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);

  const selectCustomerFullName = useMemo(() => selectCustomerFullNameByID(value), [value]);
  const customerFullName = useSelector(selectCustomerFullName);
  const dropDownListValue = { text: customerFullName, value };

  const selectCustomersById = useMemo(() => selectCustomersByIdData, []);
  const customersById = useSelector(selectCustomersById);

  useEffect(() => {
    if (value) return;
    AgendaEditCellsActions.validateFullNameValue(dispatch, false);

    return () => {
      AgendaEditCellsActions.validateFullNameValue(dispatch, true);
    };
  }, [dispatch, value]);

  const onFullNameChange = (evt: ComboBoxChangeEvent) => {
    const evtValue = evt.value ? evt.value : EmptyDropDownListDataItem;
    const selectedCustomer = customersById[evtValue.value];
    const newTitle = selectedCustomer ? setTitleProp<number>(selectedCustomer.FirstName ?? '', selectedCustomer.Title ?? '', dataItemID) : '';

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
      valid={isValidFullName}
      placeholder="This field is required."
    />
  );
};

export const AgendaServicesMultiSelect: FC<EditCellDropDownListProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, { results: number[] }>(dataItemID, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectServicesDropDownListData = useMemo(selectServicesDataForDropDownListData, []);
  const dataForDropdownList = useSelector(selectServicesDropDownListData);
  const memoMultiSelectData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const multiSelectValue = memoMultiSelectData.filter((item) => value.results.find((ID) => ID === item.value));

  const onServicesChange = (evt: MultiSelectChangeEvent) => {
    onChange({
      dataItem: dataItemID,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: { results: evt.target.value.map(({ value }) => value) },
    });
  };

  return (
    <MultiSelect onChange={onServicesChange} value={multiSelectValue} data={memoMultiSelectData} textField="text" disabled={isDataItemLoading} />
  );
};
