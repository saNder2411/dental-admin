import React, { FC, useState } from 'react';
import { SchedulerItem, SchedulerItemContent, SchedulerItemProps } from '@progress/kendo-react-scheduler';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
// Styled Components
import * as SC from './SchedulerCustomItemStyled';
// Instruments
import { IconBook, IconName } from '../../_instruments';

export const SchedulerCustomItem: FC<SchedulerItemProps> = (props): JSX.Element => {
  const [showPopup, setShowPopup] = useState(false);
  const intl = useInternationalization();
  // console.log(`CustomItemProps`, props);
  const { dataItem, children, isAllDay, zonedStart, zonedEnd, _ref } = props;
  const iconName = dataItem.status as IconName;
  const iconDentalName = dataItem.dentalStatus as IconName;

  return (
    <div onMouseUp={() => setShowPopup((prevState) => !prevState)} onMouseMove={() => setShowPopup(false)}>
      <SchedulerItem {...props}>
        <SC.SchedulerItemTopWrapper>
          {children}
          <div className="SchedulerItem__icons">
            <div className="SchedulerItem__icon">
              <FontAwesomeIcon icon={IconBook[iconDentalName].icon} color={IconBook[iconDentalName].statusColor} size={'lg'} />
            </div>
            <div className="SchedulerItem__icon">
              <FontAwesomeIcon icon={IconBook[iconName].icon} style={IconBook[iconName].style} size={'lg'} />
            </div>
          </div>
        </SC.SchedulerItemTopWrapper>
        {!isAllDay && (
          <SchedulerItemContent>
            <div className="SchedulerItemContent__item">{dataItem.refID}</div>
            <div className="SchedulerItemContent__item">
              {intl.formatDate(zonedStart, 't')} - {intl.formatDate(zonedEnd, 't')}
            </div>
            <div className="SchedulerItemContent__item">{dataItem.notes}</div>
          </SchedulerItemContent>
        )}
        <Popup
          show={showPopup}
          anchorAlign={{ horizontal: 'left', vertical: 'top' }}
          popupAlign={{ horizontal: 'left', vertical: 'bottom' }}
          popupClass="SchedulerItemContent-popup-content"
          anchor={_ref.current?.element as any}
          style={{ width: _ref.current?.element?.offsetWidth }}>
          <div className="rounded" style={{ overflow: 'hidden' }}>
            <Card>
              <div>
                <CardHeader>
                  <h5>{dataItem.staff}</h5>
                </CardHeader>
                <CardBody>
                  <CardHeader>Ref ID: {dataItem.refID}</CardHeader>
                  <CardHeader>Start: {intl.formatDate(props.zonedStart, 't')}</CardHeader>
                  <CardHeader>End: {intl.formatDate(props.zonedEnd, 't')}</CardHeader>
                  <CardHeader>Mobile Phone: {dataItem.mobilePhone}</CardHeader>
                  <CardHeader>Email: {dataItem.email}</CardHeader>
                  <CardHeader>Notes: {dataItem.notes}</CardHeader>
                </CardBody>
              </div>
            </Card>
          </div>
        </Popup>
      </SchedulerItem>
    </div>
  );
};
