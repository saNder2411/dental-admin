import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerItem as KendoSchedulerItem } from '@progress/kendo-react-scheduler';
import { useAsyncFocusBlur } from '@progress/kendo-react-common';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
// Styled Components
import * as SC from '../SchedulerItemsStyled/SchedulerItemStyled';
// Components
import { SchedulerEditItem } from './SchedulerEditItem';
import { RemoveConfirmModal, EditOccurrenceConfirmModal, RemoveOccurrenceConfirmModal } from './SchedulerConfirmModals';
// Instruments
import { IconMap } from '../../../_instruments';
// Types
import { StatusNames } from '../../Grid/GridTypes';
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
import { StaffDataItem } from '../../../Staff/StaffTypes';
//Actions
import { SchedulerActions } from '../SchedulerActions';
import { updateAppointmentDataItemInitAsyncAC, deleteAppointmentDataItemInitAsyncAC } from '../../Grid/GridAC';
// Selectors
import { selectDataItemIsLoading } from '../../Grid/GridSelectors';
import { selectFormItemID, selectSelectedView } from '../SchedulerSelectors';
// Helpers
import { getNewDataItemWithUpdateException, getInitDataForNewDataItem } from '../SchedulerHelpers';

export const SchedulerItem: FC<CustomSchedulerItemProps> = (props): JSX.Element => {
  const { dataItem, children, zonedStart, zonedEnd, _ref, group, onClick, onBlur, onFocus, isRecurring } = props;
  // console.log('itemProps', props);

  const intl = useInternationalization();
  const dispatch = useDispatch();
  const appointmentIsDataItemLoading = useSelector(selectDataItemIsLoading);
  const formItemID = useSelector(selectFormItemID);
  const isOriginalDataItem = new Date(dataItem.EventDate).getTime() === dataItem.Start.getTime();
  const inEdit = formItemID === dataItem.ID && isOriginalDataItem;
  const selectedView = useSelector(selectSelectedView);

  const [showPopup, setShowPopup] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showEditOccurrenceDialog, setShowEditOccurrenceDialog] = useState(false);
  const [showRemoveOccurrenceDialog, setShowRemoveOccurrenceDialog] = useState(false);
  const [isRemoveOccurrence, setIsRemoveOccurrence] = useState(false);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);

  const resource = (group.resources[0] as unknown) as StaffDataItem;
  const color = resource.CalendarColHex;
  const iconName = dataItem.AppointmentStatus;
  const iconDentalName = StatusNames.Tooth;
  const width = _ref.current?.element?.offsetWidth;
  const height = _ref.current?.element?.offsetHeight;

  useEffect(
    () => () => {
      setIsDataItemLoading(false);
      setShowRemoveDialog(false);
      setShowRemoveOccurrenceDialog(false);
      setIsRemoveOccurrence(false);
    },
    []
  );

  const onSchedulerItemClick = useCallback(
    (evt) => {
      if (appointmentIsDataItemLoading) return;

      setShowPopup((prevState) => !prevState);
      onClick && onClick(evt);
    },
    [appointmentIsDataItemLoading, onClick]
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

    if (isRecurring) {
      setShowEditOccurrenceDialog(true);
      return;
    }

    SchedulerActions.setFormItemID(dispatch, dataItem.ID);
  }, [dispatch, dataItem.ID, isRecurring]);

  const onDeleteBtnClick = useCallback(() => {
    setShowPopup(false);

    if (isRecurring) {
      setShowRemoveOccurrenceDialog(true);
      return;
    }

    setShowRemoveDialog(true);
  }, [isRecurring]);

  const { onFocus: onFocusAsync, onBlur: onBlurAsync } = useAsyncFocusBlur({ onFocus, onBlur: onSchedulerItemBlur });

  const onConfirmDeleteDataItem = () => {
    setIsDataItemLoading(true);
    if (isRemoveOccurrence) {
      const exception = new Date(dataItem.Start.getTime());
      const newDataItem = getNewDataItemWithUpdateException(dataItem, exception);

      dispatch(updateAppointmentDataItemInitAsyncAC(newDataItem, () => {}));
      return;
    }
    dispatch(deleteAppointmentDataItemInitAsyncAC(dataItem.ID, () => {}));
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
        <RemoveConfirmModal
          isDataItemLoading={isDataItemLoading}
          onClose={() => !isDataItemLoading && setShowRemoveDialog(false)}
          onCancel={() => setShowRemoveDialog(false)}
          onConfirm={onConfirmDeleteDataItem}
        />
      )}
      {showRemoveOccurrenceDialog && (
        <RemoveOccurrenceConfirmModal
          onClose={() => setShowRemoveOccurrenceDialog(false)}
          onCancel={() => {
            setIsRemoveOccurrence(true);
            setShowRemoveOccurrenceDialog(false);
            setShowRemoveDialog(true);
          }}
          onConfirm={() => {
            setShowRemoveOccurrenceDialog(false);
            setShowRemoveDialog(true);
          }}
        />
      )}
      {showEditOccurrenceDialog && (
        <EditOccurrenceConfirmModal
          onClose={() => setShowEditOccurrenceDialog(false)}
          onCancel={() => {
            setShowEditOccurrenceDialog(false);
            SchedulerActions.changeUpdatedRecurringDataItem(
              dispatch,
              getNewDataItemWithUpdateException(dataItem, new Date(dataItem.Start.getTime()))
            );
            SchedulerActions.addNewItemToEdit(dispatch, getInitDataForNewDataItem(dataItem.Start, selectedView, resource.ID));
          }}
          onConfirm={() => {
            setShowEditOccurrenceDialog(false);
            SchedulerActions.setFormItemID(dispatch, dataItem.ID);
          }}
        />
      )}
      {inEdit && <SchedulerEditItem {...props} />}
    </>
  );
};
