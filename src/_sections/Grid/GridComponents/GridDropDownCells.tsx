import React, { FC, useState, useEffect, useMemo, ReactText } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
import { GridCellDecoratorWithFetchingData } from './GridCellDecoratorWithFetchingData';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { StatusNames, AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Selectors
import { selectCustomersMemoFullNameList } from '../../../Customers/CustomersSelectors';
import { selectServicesMemoData, selectServicesMemoRoleSkills } from '../../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
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

export const SvcStaffCell: FC<GridCellProps<CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];

  return <td>{dataItem.inEdit ? <GridCellDecoratorWithFetchingData {...props} /> : value}</td>;
};

export const AgendaSvcStaffCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);
  const currentEmployee = teamStaffData.find(({ Id }) => Id === dataItem.LookupHR01team.Id);
  const value = currentEmployee ? currentEmployee.FullName.split(' ').slice(-1)[0] : '';

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
    <td>
      {dataItem.inEdit ? (
        <GridCellDecoratorWithDataItemLoadingState>
          <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={dataForDropdownList} textField={field} />
        </GridCellDecoratorWithDataItemLoadingState>
      ) : (
        value
      )}
    </td>
  );
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

export const LastAppointmentsCell: FC<GridCellProps<CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const multiSelectData = Array.from(new Set(dataItem.LookupMultiAppointments))
    .slice(0, 5)
    .map((value) => ({ [field]: value, value }));
  const value = dataItem[field] as string[];
  const dropDownListValue = value[0]
    ? value[0].split(`, `).map((value: string) => ({ [field]: value, value }))
    : [{ [field]: value[0], value: value[0] }];
  const [multiSelectValue, setMultiSelectValue] = useState<{ [key: string]: string; value: string }[]>(dropDownListValue);

  useEffect(() => {
    let isNewItem = !!!value;

    if (isNewItem) {
      setMultiSelectValue([]);
      isNewItem = false;
    }
  }, [value]);

  const onAppointmentChange = (evt: MultiSelectChangeEvent) => {
    setMultiSelectValue([...evt.target.value]);
    console.log(evt.target.value);
    onChange({
      dataItem,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: [...evt.target.value.map(({ value }) => value), ...dataItem.LookupMultiAppointments],
    });
  };
  return (
    <td>
      {dataItem.inEdit ? (
        <GridCellDecoratorWithDataItemLoadingState>
          <MultiSelect onChange={onAppointmentChange} value={multiSelectValue} data={multiSelectData} textField={field} />
        </GridCellDecoratorWithDataItemLoadingState>
      ) : (
        value[0]
      )}
    </td>
  );
};

export const RoleSkillsCell: FC<GridCellProps<TeamStaffDataItem | ServicesDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const selectServicesRoleSkills = useMemo(selectServicesMemoRoleSkills, []);
  const roleSkills = useSelector(selectServicesRoleSkills);
  const multiSelectData = roleSkills.map((value) => ({ [field]: value, value }));
  const value = dataItem[field] as any;
  const dropDownListValue = value ? value.split(`, `).map((value: string) => ({ [field]: value, value })) : [{ [field]: value, value }];
  const [multiSelectValue, setMultiSelectValue] = useState<{ [key: string]: string; value: string }[]>(dropDownListValue);

  useEffect(() => {
    let isNewItem = !!!value;

    if (isNewItem) {
      setMultiSelectValue([]);
      isNewItem = false;
    }
  }, [value]);

  const onServicesChange = (evt: MultiSelectChangeEvent) => {
    setMultiSelectValue([...evt.target.value]);
    onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value).join(', ') });
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

export const BooleanFlagCell: FC<GridCellProps<ServicesDataItem | TeamStaffDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const flag = !!value;
  const localizedDataForFlagCell = [
    { [field]: 'yes', value: true },
    { [field]: 'no', value: false },
  ];
  const dropDownListValue = localizedDataForFlagCell.find(({ value }) => value === flag);
  const onBooleanFlagChange = onGridDropDownChange<ServicesDataItem | TeamStaffDataItem>(dataItem, field, onChange);

  return dataItem.inEdit ? (
    <td>
      <GridCellDecoratorWithDataItemLoadingState>
        <DropDownList onChange={onBooleanFlagChange} value={dropDownListValue} data={localizedDataForFlagCell} textField={field} />
      </GridCellDecoratorWithDataItemLoadingState>
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={flag}>
      <span className={flag ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const GenderCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field] ? dataItem[field] : '(1) Female';
  const localizedDataForGenderCell = [
    { [field]: '(1) Female', value: '(1) Female' },
    { [field]: '(2) Male', value: '(2) Male' },
  ];
  const dropDownListValue = localizedDataForGenderCell.find((item) => item.value === value);

  const onGenderChange = onGridDropDownChange<AgendaDataItem | CustomersDataItem>(dataItem, field, onChange);

  return (
    <td>
      {dataItem.inEdit ? (
        <GridCellDecoratorWithDataItemLoadingState>
          <DropDownList onChange={onGenderChange} value={dropDownListValue} data={localizedDataForGenderCell} textField={field} />
        </GridCellDecoratorWithDataItemLoadingState>
      ) : (
        value
      )}
    </td>
  );
};
