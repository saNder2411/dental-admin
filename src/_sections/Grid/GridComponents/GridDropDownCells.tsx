import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { StatusNames, AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Selectors
import { selectTeamStaffData } from '../../../TeamStaff';
import { selectCustomersData } from '../../../Customers';
import { selectServicesReferences, selectServicesRoleSkills } from '../../../Services';
// Helpers
import { onGridDropDownChange } from './GridComponentsHelpers';

const statusList = Object.values(StatusNames).map((status) => ({ status, value: status }));

export const StatusCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const dropDownListValue = statusList.find(({ status }) => status === value);
  const onStatusChange = onGridDropDownChange<AgendaDataItem>(dataItem, field, onChange);

  return (
    <td>{dataItem.inEdit ? <DropDownList onChange={onStatusChange} value={dropDownListValue} data={statusList} textField={field} /> : value}</td>
  );
};

export const SvcStaffCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const data = useSelector(selectTeamStaffData);
  const teamStaffNameList = data.map(({ lastName }) => ({ [field]: lastName, value: lastName }));
  const value = dataItem[field];
  const dropDownListValue = teamStaffNameList.find((item) => item.value === value);
  const onSvcStaffChange = onGridDropDownChange<AgendaDataItem>(dataItem, field, onChange);

  return (
    <td>
      {dataItem.inEdit ? <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={teamStaffNameList} textField={field} /> : value}
    </td>
  );
};

export const FullNameCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const data = useSelector(selectCustomersData);
  const customerNameList = data.map(({ lastName, firstName }) => ({
    [field]: `${firstName} ${lastName}`,
    value: `${firstName} ${lastName}`,
  }));
  const value = dataItem[field];
  const dropDownListValue = customerNameList.find((item) => item.value === value);
  const onLastNameChange = onGridDropDownChange<AgendaDataItem>(dataItem, field, onChange);

  return (
    <td>
      {dataItem.inEdit ? <DropDownList onChange={onLastNameChange} value={dropDownListValue} data={customerNameList} textField={field} /> : value}
    </td>
  );
};

export const ServicesCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const servicesReferences = useSelector(selectServicesReferences());
  const multiSelectData = servicesReferences.map((value) => ({ [field]: value, value }));
  const value = dataItem[field] as string;
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
    <td>{dataItem.inEdit ? <MultiSelect onChange={onServicesChange} value={multiSelectValue} data={multiSelectData} textField={field} /> : value}</td>
  );
};

export const RoleSkillsCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
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
    <td>{dataItem.inEdit ? <MultiSelect onChange={onServicesChange} value={multiSelectValue} data={multiSelectData} textField={field} /> : value}</td>
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
      <DropDownList onChange={onBooleanFlagChange} value={dropDownListValue} data={localizedDataForFlagCell} textField={field} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={flag}>
      <span className={flag ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const GenderCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field] ? dataItem[field] : 'Female';
  const localizedDataForGenderCell = [
    { [field]: 'Female', value: 'Female' },
    { [field]: 'Male', value: 'Male' },
  ];
  const dropDownListValue = localizedDataForGenderCell.find((item) => item.value === value);

  const onGenderChange = onGridDropDownChange<AgendaDataItem | CustomersDataItem>(dataItem, field, onChange);

  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList onChange={onGenderChange} value={dropDownListValue} data={localizedDataForGenderCell} textField={field} />
      ) : (
        value
      )}
    </td>
  );
};
