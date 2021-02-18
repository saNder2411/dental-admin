import React, { FC, useState, useCallback, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerItemHandle,  } from '@progress/kendo-react-scheduler';
import { useAsyncFocusBlur } from '@progress/kendo-react-common';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
// Instruments
import { IconMap } from '../../../_instruments';

interface Props {
  showPopup: boolean;
  ref: RefObject<SchedulerItemHandle | null>;
}

export const SchedulerItemPopup: FC<Props> = ({ showPopup, ref }) => {
  return (
    <Popup
      show={showPopup}
      anchorAlign={{ horizontal: 'right', vertical: 'center' }}
      popupAlign={{ horizontal: 'left', vertical: 'center' }}
      popupClass="SchedulerItemContent-popup-content"
      anchor={ref.current?.element as any}
      style={{ width: 330 }}>
      {/* <div className="rounded" tabIndex={-1} onFocus={onFocusAsync as any} onBlur={onBlurAsync as any}>
        <CardHeader>
          <CardHeader>
            <div className="d-flex align-items-center">
              <div className="team-marker" style={{ backgroundColor: color }} />
              <h5>{dataItem.Title}</h5>
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
                <span className="col-md-9">Status: {dataItem.AppointmentStatus}</span>
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
            <CardHeader>Ref ID: {dataItem.Title}</CardHeader>
            <CardHeader>
              <span className="k-icon k-i-clock" /> Start: {intl.formatDate(zonedStart, 't')}
            </CardHeader>
            <CardHeader>
              <span className="k-icon k-i-clock" /> End: {intl.formatDate(zonedEnd, 't')}
            </CardHeader>
            <CardHeader>Mobile Phone: {CellPhone}</CardHeader>
            <CardHeader>Email: {Email}</CardHeader>
            <CardHeader>Description: {dataItem.Description}</CardHeader>
          </CardBody>
        </CardHeader>
      </div> */}
    </Popup>
  );
};
