import React, { FC, useState, useEffect, useMemo, ReactText } from 'react';
import { useSelector } from 'react-redux';
import { MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
import { AgendaSvcStaffDropDownList, AgendaStatusDropDownList, AgendaFullNameDropDownList } from './GridAgendaDropDownCells';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Instruments
import { IconMap } from '../../../_instruments';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectServicesMemoData } from '../../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';

export const AgendaStatusIcon: FC<GridCellProps<AgendaDataItem>> = ({ dataItem }): JSX.Element => {
  const value = dataItem.AppointmentStatus;
  const iconName = value ? value : StatusNames.Consultation;

  return (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[iconName as StatusNames].icon} style={IconMap[iconName as StatusNames].style} />
    </SC.StatusIcon>
  );
};

export const AgendaStatusCell: FC<GridCellProps<AgendaDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const value = dataItem.AppointmentStatus;

  return <td>{dataItem.inEdit ? <AgendaStatusDropDownList {...props} value={value} /> : value}</td>;
};

export const AgendaSvcStaffCell: FC<GridCellProps<AgendaDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);
  const currentEmployee = teamStaffData.find(({ Id }) => Id === dataItem.LookupHR01team.Id);
  const value = currentEmployee ? currentEmployee.FullName.split(' ').slice(-1)[0] : '';

  return <td>{dataItem.inEdit ? <AgendaSvcStaffDropDownList {...props} domainData={teamStaffData} value={value} /> : value}</td>;
};

export const AgendaFullNameCell: FC<GridCellProps<AgendaDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const value = dataItem.FullName;

  return <td>{dataItem.inEdit ? <AgendaFullNameDropDownList {...props} value={value} /> : value}</td>;
};

export const AgendaServicesCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
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
