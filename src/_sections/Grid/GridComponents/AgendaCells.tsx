import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import { AgendaSvcStaffDropDownList, AgendaStatusDropDownList, AgendaFullNameDropDownList, AgendaServicesMultiSelect } from './AgendaDropDownCells';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Instruments
import { IconMap } from '../../../_instruments';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectGridMemoDataItem } from '../GridSelectors';
import { selectServicesMemoData } from '../../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersMemoData } from '../../../Customers/CustomersSelectors';

export const AgendaStatusIcon: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : null;

  const iconName = dataItem ? dataItem[field] : StatusNames.Consultation;

  return (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[iconName as StatusNames].icon} style={IconMap[iconName as StatusNames].style} />
    </SC.StatusIcon>
  );
};

export const AgendaStatusCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { AppointmentStatus: StatusNames.Consultation, inEdit: false };
  const value = dataItem.AppointmentStatus;
  console.log(`field ${ID}`, field);

  return (
    <td>
      {dataItem.inEdit ? (
        <AgendaStatusDropDownList rowType="" dataItem={dataItem as AgendaDataItem} field="AppointmentStatus" onChange={onChange} value={value} />
      ) : (
        value
      )}
    </td>
  );
};

export const AgendaSvcStaffCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, onChange }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { LookupHR01team: { Id: -1 }, inEdit: false };

  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);
  const currentEmployee = teamStaffData.find(({ Id }) => Id === dataItem.LookupHR01team.Id);
  const value = currentEmployee ? currentEmployee.FullName.split(' ').slice(-1)[0] : '';

  return (
    <td>
      {dataItem.inEdit ? (
        <AgendaSvcStaffDropDownList
          rowType=""
          dataItem={dataItem as AgendaDataItem}
          field="LookupHR01team"
          onChange={onChange}
          domainData={teamStaffData}
          value={value}
        />
      ) : (
        value
      )}
    </td>
  );
};

export const AgendaServicesCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, onChange }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { LookupMultiBP01offerings: { results: [] }, inEdit: false };

  const selectServicesData = useMemo(selectServicesMemoData, []);
  const servicesData = useSelector(selectServicesData);
  const currentServices = servicesData.filter(({ Id }) => dataItem.LookupMultiBP01offerings.results.find((item) => item.Id === Id));
  const value = currentServices.map(({ OfferingsName_Edit }) => OfferingsName_Edit).join(' | ');

  return (
    <td>
      {dataItem.inEdit ? (
        <AgendaServicesMultiSelect
          rowType=""
          dataItem={dataItem as AgendaDataItem}
          field="LookupMultiBP01offerings"
          onChange={onChange}
          value={currentServices}
          domainData={servicesData}
        />
      ) : (
        value
      )}
    </td>
  );
};

export const AgendaFullNameCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, onChange }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { LookupCM102customers: { Id: -1 }, inEdit: false };

  const selectCustomersData = useMemo(selectCustomersMemoData, []);
  const customersData = useSelector(selectCustomersData);
  const currentCustomer = customersData.find(({ Id }) => Id === dataItem.LookupCM102customers.Id);
  const value = currentCustomer ? currentCustomer.FullName : '';

  return (
    <td>
      {dataItem.inEdit ? (
        <AgendaFullNameDropDownList
          rowType=""
          dataItem={dataItem as AgendaDataItem}
          field="LookupCM102customers"
          onChange={onChange}
          domainData={customersData}
          value={value}
        />
      ) : (
        value
      )}
    </td>
  );
};
