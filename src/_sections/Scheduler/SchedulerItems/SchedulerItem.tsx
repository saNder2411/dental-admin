import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SchedulerItem as KendoSchedulerItem, useSchedulerEditItemShowOccurrenceDialogContext } from '@progress/kendo-react-scheduler';
import { useAsyncFocusBlur } from '@progress/kendo-react-common';
import { Popup } from '@progress/kendo-react-popup';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
// Styled Components
import * as SC from '../SchedulerItemsStyled/SchedulerItemStyled';
// Components
import { Loader } from '../../../_components';
// Instruments
import { IconMap } from '../../../_instruments';
// Types
import { StatusNames } from '../../../Agenda/AgendaTypes';
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
//Actions
import { SchedulerActions } from '../SchedulerActions';
import { AgendaActions } from '../../../Agenda/AgendaActions';

export const SchedulerItem: FC<CustomSchedulerItemProps> = (props): JSX.Element => {
  const intl = useInternationalization();
  const [showPopup, setShowPopup] = useState(false);
  const { setFormItemID } = SchedulerActions;
  const dispatch = useDispatch();
  const [, setShowOccurrenceDialog] = useSchedulerEditItemShowOccurrenceDialogContext();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);

  const { dataItem, children, zonedStart, zonedEnd, _ref, group, onClick, onBlur, onFocus, isRecurring } = props;
  const resource = (group.resources[0] as unknown) as TeamStaffDataItem;
  const color = resource.CalendarColHex;
  const iconName = dataItem.AppointmentStatus;
  const iconDentalName = StatusNames.Tooth;
  const width = _ref.current?.element?.offsetWidth;
  const height = _ref.current?.element?.offsetHeight;

  useEffect(
    () => () => {
      setIsDataItemLoading(false);
      setShowRemoveDialog(false);
    },
    []
  );

  const onSchedulerItemClick = useCallback(
    (evt) => {
      setShowPopup((prevState) => !prevState);
      onClick && onClick(evt);
    },
    [onClick]
  );

  const onSchedulerItemBlur = useCallback(
    (evt) => {
      setShowPopup(false);
      onBlur && onBlur(evt);
    },
    [onBlur]
  );

  const onCloseBtnClick = useCallback(() => setShowPopup(false), [setShowPopup]);

  const onEditBtnClick = useCallback(() => {
    setShowPopup(false);
    setFormItemID(dispatch, dataItem.ID);
    isRecurring && setShowOccurrenceDialog(true);
  }, [setFormItemID, dispatch, dataItem.ID, isRecurring, setShowOccurrenceDialog]);

  const onDeleteBtnClick = useCallback(() => {
    setShowPopup(false);

    if (isRecurring) {
      setShowOccurrenceDialog(true);
    } else {
      setShowRemoveDialog(true);
    }
  }, [setShowPopup, isRecurring, setShowOccurrenceDialog, setShowRemoveDialog]);

  const { onFocus: onFocusAsync, onBlur: onBlurAsync } = useAsyncFocusBlur({ onFocus, onBlur: onSchedulerItemBlur });

  const onConfirmDeleteDataItem = () => {
    setIsDataItemLoading(true);
    AgendaActions.deleteDataItem(dispatch, dataItem.ID, () => {});
  };

  return (
    <>
      <KendoSchedulerItem
        {...props}
        onClick={onSchedulerItemClick}
        onDoubleClick={onEditBtnClick}
        onFocus={onFocusAsync}
        onBlur={onBlurAsync}
        onRemoveClick={onDeleteBtnClick}>
        {height && height > 25 && (
          <SC.SchedulerItemTopWrapper isSmallDisplay={!!(width && width < 120)}>
            {width && width > 120 && children}
            <div className="SchedulerItem__icons">
              <div className="SchedulerItem__icon">
                <FontAwesomeIcon icon={IconMap[iconDentalName].icon} color={IconMap[iconDentalName].statusColor} />
              </div>
              <div className="SchedulerItem__icon">
                <FontAwesomeIcon icon={IconMap[iconName].icon} style={IconMap[iconName].style} />
              </div>
            </div>
          </SC.SchedulerItemTopWrapper>
        )}
      </KendoSchedulerItem>
      <Popup
        show={showPopup}
        anchorAlign={{ horizontal: 'right', vertical: 'center' }}
        popupAlign={{ horizontal: 'left', vertical: 'center' }}
        popupClass="SchedulerItemContent-popup-content"
        anchor={_ref.current?.element as any}
        style={{ width: 300 }}>
        <div className="rounded" tabIndex={-1} onFocus={onFocusAsync as any} onBlur={onBlurAsync as any}>
          <Card>
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
              <CardHeader>Mobile Phone: {dataItem.CellPhone}</CardHeader>
              <CardHeader>Email: {dataItem.Email}</CardHeader>
              <CardHeader>Notes: {dataItem.Description}</CardHeader>
            </CardBody>
          </Card>
        </div>
      </Popup>
      {showRemoveDialog && (
        <Dialog title={'Delete Event'} onClose={() => !isDataItemLoading && setShowRemoveDialog(false)}>
          <p style={{ margin: '25px', textAlign: 'center' }}>Are you sure you want to delete this event?</p>
          <DialogActionsBar>
            <button className="k-button" onClick={() => setShowRemoveDialog(false)} disabled={isDataItemLoading}>
              Cancel
            </button>
            <button className="k-button" onClick={onConfirmDeleteDataItem} disabled={isDataItemLoading}>
              {isDataItemLoading ? (
                <Loader
                  className="d-flex justify-content-center align-items-center"
                  type="pulsing"
                  isLoading={isDataItemLoading}
                  themeColor="primary"
                />
              ) : (
                `Delete`
              )}
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
};
