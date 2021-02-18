import React, { FC, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerItem as KendoSchedulerItem } from '@progress/kendo-react-scheduler';
import { Popup } from '@progress/kendo-react-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Styled Components
import * as SC from '../SchedulerItemsStyled/SchedulerItemStyled';
// Components
import { SchedulerEditItem } from './SchedulerEditItem';
import { SchedulerItemPopupContent } from './SchedulerItemPopupContent';
import { RemoveConfirmModal, EditOccurrenceConfirmModal, RemoveOccurrenceConfirmModal } from './SchedulerConfirmModals';
// Instruments
import { IconMap } from '../../../_instruments';
// Types
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
import { StatusNames } from '../../../_bus/_Appointments/AppointmentsTypes';
//Action Creators
import { updateAppointmentDataItemInitAsyncAC, deleteAppointmentDataItemInitAsyncAC, addItemToEditAC } from '../../../_bus/Entities/EntitiesAC';
import { changeUpdatedRecurringDataItemAC, addNewItemToEditFormAC } from '../../../_bus/Scheduler/SchedulerAC';
// Selectors
import { selectSelectedView } from '../../../_bus/Scheduler/SchedulerSelectors';
import { selectAppointmentsAllIds } from '../../../_bus/Entities/EntitiesSelectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Helpers
import { getNewDataItemWithUpdateException, getInitDataForNewDataItem } from '../SchedulerHelpers';

export const SchedulerItem: FC<CustomSchedulerItemProps> = (props): JSX.Element | null => {
  const { dataItem, children, _ref, group, isRecurring } = props;
  const dispatch = useDispatch();
  const appointmentIsDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectedView = useSelector(selectSelectedView);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showEditOccurrenceDialog, setShowEditOccurrenceDialog] = useState(false);
  const [showRemoveOccurrenceDialog, setShowRemoveOccurrenceDialog] = useState(false);
  const [isRemoveOccurrence, setIsRemoveOccurrence] = useState(false);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);

  const resource = (group.resources[0] as unknown) as StaffDataItem | undefined;
  // console.log(`SchedulerItemProps`, props, showEditForm);
  const iconName = dataItem.AppointmentStatus;
  const iconDentalName = StatusNames.Tooth;
  const width = _ref.current?.element?.offsetWidth;
  const height = _ref.current?.element?.offsetHeight;

  const appointmentsAllIDs = useSelector(selectAppointmentsAllIds);

  const onSchedulerItemClick = useCallback(() => !appointmentIsDataItemLoading && setShowPopup((prevState) => !prevState), [
    appointmentIsDataItemLoading,
  ]);

  const onCloseBtnClick = useCallback(() => setShowPopup(false), [setShowPopup]);

  const onEditBtnClick = useCallback(() => {
    setShowPopup(false);

    if (isRecurring) {
      setShowEditOccurrenceDialog(true);
      return;
    }
    dispatch(addItemToEditAC(dataItem.ID, EntitiesKeys.Appointments));
    setShowEditForm(true);
  }, [dispatch, dataItem.ID, isRecurring]);

  const onDeleteBtnClick = useCallback(() => {
    setShowPopup(false);

    if (isRecurring) {
      setShowRemoveOccurrenceDialog(true);
      return;
    }

    setShowRemoveDialog(true);
  }, [isRecurring]);

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

  return resource ? (
    <>
      <KendoSchedulerItem {...props} onClick={onSchedulerItemClick} onDoubleClick={onEditBtnClick} onRemoveClick={onDeleteBtnClick}>
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
        style={{ width: 330 }}>
        <SchedulerItemPopupContent
          resource={resource}
          dataItem={dataItem}
          onEditBtnClick={onEditBtnClick}
          onDeleteBtnClick={onDeleteBtnClick}
          onCloseBtnClick={onCloseBtnClick}
        />
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
            dispatch(changeUpdatedRecurringDataItemAC(getNewDataItemWithUpdateException(dataItem, new Date(dataItem.Start.getTime()))));
            dispatch(addNewItemToEditFormAC(getInitDataForNewDataItem(dataItem.Start, selectedView, resource?.ID ?? 1), appointmentsAllIDs));
          }}
          onConfirm={() => {
            setShowEditOccurrenceDialog(false);
            dispatch(addItemToEditAC(dataItem.ID, EntitiesKeys.Appointments));
            setShowEditForm(true);
          }}
        />
      )}
      {showEditForm && <SchedulerEditItem dataItemID={dataItem.ID} onHideForm={() => setShowEditForm(false)} />}
    </>
  ) : null;
};
