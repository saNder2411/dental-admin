import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
import { GridCellDecoratorWithFetchingData } from './GridCellDecoratorWithFetchingData';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectServicesMemoRoleSkills } from '../../../Services/ServicesSelectors';
// Helpers
import { onGridDropDownChange } from './GridComponentsHelpers';

export const SvcStaffCell: FC<GridCellProps<CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];

  return <td>{dataItem.inEdit ? <GridCellDecoratorWithFetchingData {...props} /> : value}</td>;
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
