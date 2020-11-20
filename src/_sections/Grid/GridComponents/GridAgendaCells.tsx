import React, { FC, useState, useEffect, useMemo, ReactText } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { StatusNames, AgendaDataItem } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectCustomersMemoFullNameList } from '../../../Customers/CustomersSelectors';
import { selectServicesMemoData } from '../../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Helpers
import { onGridDropDownChange } from './GridComponentsHelpers';

const statusList = Object.values(StatusNames).map((status) => ({ status, value: status }));

export const StatusCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const dropDownListValue = statusList.find(({ status }) => status === value);
  const onStatusChange = onGridDropDownChange<AgendaDataItem>(dataItem, field, onChange);

  return (
    <td>
      {dataItem.inEdit ? (
        <GridCellDecoratorWithDataItemLoadingState>
          <DropDownList onChange={onStatusChange} value={dropDownListValue} data={statusList} textField={field} />
        </GridCellDecoratorWithDataItemLoadingState>
      ) : (
        value
      )}
    </td>
  );
};

export const AgendaSvcStaffCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);
  const currentEmployee = teamStaffData.find(({ Id }) => Id === dataItem.LookupHR01team.Id);
  const value = currentEmployee ? currentEmployee.FullName.split(' ').slice(-1)[0] : '';

  const AgendaSvcStaffCellDropDownList = () => {
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

  return <td>{dataItem.inEdit ? <AgendaSvcStaffCellDropDownList /> : value}</td>;
};

export const FullNameCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const selectCustomersFullNameList = useMemo(selectCustomersMemoFullNameList, []);
  const customersFullNameList = useSelector(selectCustomersFullNameList);
  const dataForDropdownList = customersFullNameList.map((fullName) => ({
    [field]: fullName,
    value: fullName,
  }));
  const value = dataItem[field];

  const dropDownListValue = dataForDropdownList.find((item) => item.value === value);
  const onLastNameChange = onGridDropDownChange<AgendaDataItem>(dataItem, field, onChange);

  return (
    <td>
      {dataItem.inEdit ? (
        <GridCellDecoratorWithDataItemLoadingState>
          <DropDownList onChange={onLastNameChange} value={dropDownListValue} data={dataForDropdownList} textField={field} />
        </GridCellDecoratorWithDataItemLoadingState>
      ) : (
        value
      )}
    </td>
  );
};

export const ServicesCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const selectServicesData = useMemo(selectServicesMemoData, []);
  const servicesData = useSelector(selectServicesData);
  const multiSelectData = servicesData.map(({ OfferingsName_Edit, Id }) => ({ [field]: OfferingsName_Edit, value: Id }));
  const dropDownListValue = dataItem.LookupMultiBP01offerings.results
    .map(({ Id }) => multiSelectData.find(({ value }) => value === Id))
    .map((item) => (item ? item : { [field]: '', value: -1 }));

  const value = dropDownListValue.map((item) => item[field]).join(`, `);

  const [multiSelectValue, setMultiSelectValue] = useState<{ [key: string]: ReactText; value: number }[]>(dropDownListValue);

  useEffect(() => {
    let isNewItem = !!!value;

    if (isNewItem) {
      setMultiSelectValue([]);
      isNewItem = false;
    }
  }, [value]);

  const onServicesChange = (evt: MultiSelectChangeEvent) => {
    setMultiSelectValue([...evt.target.value]);
    onChange({
      dataItem,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: { results: evt.target.value.map(({ value }) => ({ Id: value, __metadata: { id: '', type: '' } })) },
    });
  };
  return (
    <td>
      {dataItem.inEdit ? (
        <GridCellDecoratorWithDataItemLoadingState>
          <MultiSelect onChange={onServicesChange} value={multiSelectValue} data={multiSelectData} textField={field} />
        </GridCellDecoratorWithDataItemLoadingState>
      ) : (
        value
      )}
    </td>
  );
};
