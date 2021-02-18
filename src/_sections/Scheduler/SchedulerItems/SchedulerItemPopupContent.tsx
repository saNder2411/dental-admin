import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
// Selectors
import { selectCustomerById } from '../../../_bus/Entities/EntitiesSelectors';
// Types
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
import { AppointmentDataItem, StatusNames } from '../../../_bus/_Appointments/AppointmentsTypes';
// Instruments
import { IconMap } from '../../../_instruments';

interface Props {
  resource: StaffDataItem | undefined;
  dataItem: AppointmentDataItem;
  onEditBtnClick: () => void;
  onDeleteBtnClick: () => void;
  onCloseBtnClick: () => void;
}

export const SchedulerItemPopupContent: FC<Props> = ({ resource, dataItem, onEditBtnClick, onDeleteBtnClick, onCloseBtnClick }) => {
  const intl = useInternationalization();
  const { AppointmentStatus, Title, Description, Start, End, LookupCM102customersId } = dataItem;

  const customer = useSelector(selectCustomerById(LookupCM102customersId));
  const { Email = '', CellPhone = '' } = customer ? customer : {};

  const color = resource?.CalendarColHex;
  const iconName = AppointmentStatus;
  const iconDentalName = StatusNames.Tooth;

  return (
    <div className="rounded" tabIndex={-1}>
      <CardHeader>
        <CardHeader>
          <div className="d-flex align-items-center">
            <div className="team-marker" style={{ backgroundColor: color }} />
            <h5>{Title}</h5>
            <div className="ml-auto">
              <Button iconClass="k-icon k-i-edit" look="flat" onClick={onEditBtnClick} />
              <Button iconClass="k-icon k-i-delete" look="flat" onClick={onDeleteBtnClick} />
              <Button iconClass="k-icon k-i-close" look="flat" onClick={onCloseBtnClick} />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <CardHeader>
            <div className="row">
              <span className="col-md-9">Status: {AppointmentStatus}</span>
              <div className="col-md-4 row">
                <div className="col-md-6">
                  <FontAwesomeIcon icon={IconMap[iconDentalName].icon} color={IconMap[iconDentalName].statusColor} />
                </div>
                <div className="col-md-6">
                  <FontAwesomeIcon icon={IconMap[iconName].icon} style={IconMap[iconName].style} />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardHeader>Ref ID: {Title}</CardHeader>
          <CardHeader>
            <span className="k-icon k-i-clock" /> Start: {intl.formatDate(Start, 't')}
          </CardHeader>
          <CardHeader>
            <span className="k-icon k-i-clock" /> End: {intl.formatDate(End, 't')}
          </CardHeader>
          <CardHeader>Mobile Phone: {CellPhone}</CardHeader>
          <CardHeader>Email: {Email}</CardHeader>
          <CardHeader>Description: {Description}</CardHeader>
        </CardBody>
      </CardHeader>
    </div>
  );
};
