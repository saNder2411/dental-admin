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
import { AgendaDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { CustomersDataItem } from '../../../Customers';
// Selectors
import { selectAgendaMemoStatusNameList, selectIsValidFullNameValue } from '../../../Agenda/AgendaSelectors';
import { selectCustomersMemoData } from '../../../Customers/CustomersSelectors';
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Actions
import { AgendaEditCellsActions } from '../../../Agenda/AgendaActions';
// Helpers
import {
  onGridDropDownChange,
  transformDomainDataToDropDownListData,
  transformDomainDataToMultiSelectData,
  EmptyDropDownListDataItem,
} from './GridItemsHelpers';
import { setTitleProp } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const AgendaStatusDropDownList: FC<EditCellDropDownListProps<AgendaDataItem, StatusNames>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const selectStatusNameList = useMemo(selectAgendaMemoStatusNameList, []);
  const statusNameList = useSelector(selectStatusNameList);
  const dataForDropDownList = statusNameList.map((value) => ({ [field]: value, value }));
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onStatusChange = onGridDropDownChange<AgendaDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onStatusChange} value={dropDownListValue} data={dataForDropDownList} textField={field} disabled={isDataItemLoading} />
  );
};

export const AgendaSvcStaffDropDownList: FC<EditCellDropDownListProps<AgendaDataItem, string, TeamStaffDataItem[]>> = ({
  dataItemID,
  field,
  onChange,
  domainData,
  value,
}) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const dataForDropdownList = domainData ? transformDomainDataToDropDownListData(domainData) : [];
  const dropDownListValue = dataForDropdownList.find((item) => item.text === value);

  const onSvcStaffChange = onGridDropDownChange<AgendaDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={dataForDropdownList} textField="text" disabled={isDataItemLoading} />
  );
};

export const AgendaFullNameDropDownList: FC<EditCellDropDownListProps<AgendaDataItem, string, CustomersDataItem[]>> = ({
  dataItemID,
  field,
  onChange,
  domainData,
  value,
}) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const dispatch = useDispatch();
  const isValidFullName = useSelector(selectIsValidFullNameValue);
  const [filter, setFilter] = useState('');
  const dataForDropDownList = domainData ? transformDomainDataToDropDownListData(domainData) : [];
  const filteredDataForDropDownList = !filter
    ? dataForDropDownList
    : dataForDropDownList.filter(({ text }) => text.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);
  const dropDownListValue = filteredDataForDropDownList.find((item) => item.text === value) ?? EmptyDropDownListDataItem;

  const selectCustomersData = useMemo(selectCustomersMemoData, []);
  const customersData = useSelector(selectCustomersData);

  useEffect(() => {
    if (value) return;
    AgendaEditCellsActions.validateFullNameValue(dispatch, false);

    return () => {
      AgendaEditCellsActions.validateFullNameValue(dispatch, true);
    };
  }, [dispatch, value]);

  const onFullNameChange = (evt: ComboBoxChangeEvent) => {
    const evtValue = evt.value ? evt.value : EmptyDropDownListDataItem;
    const selectedCustomer = customersData.find(({ Id }) => Id === evtValue.value.Id);
    const newTitle = selectedCustomer ? setTitleProp<number>(selectedCustomer.FirstName, selectedCustomer.Title, dataItemID) : '';

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

export const AgendaServicesMultiSelect: FC<EditCellDropDownListProps<AgendaDataItem, ServicesDataItem[], ServicesDataItem[]>> = ({
  dataItemID,
  field,
  onChange,
  value,
  domainData,
}) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const multiSelectData = domainData ? transformDomainDataToMultiSelectData(domainData) : [];
  const dropDownListValue = transformDomainDataToMultiSelectData(value);

  const onServicesChange = (evt: MultiSelectChangeEvent) => {
    onChange({
      dataItem: dataItemID,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: { results: evt.target.value.map(({ value }) => value) },
    });
  };

  return <MultiSelect onChange={onServicesChange} value={dropDownListValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />;
};
