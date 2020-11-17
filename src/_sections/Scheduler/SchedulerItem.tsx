import React, { FC, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SchedulerItem as KendoSchedulerItem,
  SchedulerItemProps,
  // useSchedulerEditItemFormItemContext,
  useSchedulerEditItemRemoveItemContext,
  useSchedulerEditItemShowOccurrenceDialogContext,
  useSchedulerEditItemShowRemoveDialogContext,
} from '@progress/kendo-react-scheduler';
import { useAsyncFocusBlur } from '@progress/kendo-react-common';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
// Styled Components
import * as SC from './SchedulerStyledComponents/SchedulerItemStyled';
// Instruments
import { IconMap } from '../../_instruments';
// Types
import { StatusNames } from '../../Agenda/AgendaTypes';
// Selectors
import { selectSchedulerState } from './SchedulerSelectors';

export const SchedulerItem: FC<SchedulerItemProps> = (props): JSX.Element => {
  // console.log(`CustomItemProps`, props);
  const intl = useInternationalization();
  const [showPopup, setShowPopup] = useState(false);
  const { setFormItem } = useSelector(selectSchedulerState);
  const dispatch = useDispatch();
  // const [, setFormItem] = useSchedulerEditItemFormItemContext();
  const [, setRemoveItem] = useSchedulerEditItemRemoveItemContext();
  const [, setShowOccurrenceDialog] = useSchedulerEditItemShowOccurrenceDialogContext();
  const [, setShowRemoveDialog] = useSchedulerEditItemShowRemoveDialogContext();

  const { dataItem, children, zonedStart, zonedEnd, _ref, group, onClick, onBlur, onFocus, isRecurring } = props;
  const resource = group.resources[0] as any;
  const color = resource.teamColor;
  const iconName = dataItem.status as StatusNames;
  const iconDentalName = dataItem.dentalStatus as StatusNames;
  const width = _ref.current?.element?.offsetWidth;
  const height = _ref.current?.element?.offsetHeight;

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
    setFormItem(dispatch, dataItem);
    isRecurring && setShowOccurrenceDialog(true);
  }, [setFormItem, dispatch, dataItem, isRecurring, setShowOccurrenceDialog]);

  const onDeleteBtnClick = useCallback(() => {
    setShowPopup(false);
    setRemoveItem(dataItem);

    if (isRecurring) {
      setShowOccurrenceDialog(true);
    } else {
      setShowRemoveDialog(true);
    }
  }, [setRemoveItem, setShowPopup, dataItem, isRecurring, setShowOccurrenceDialog, setShowRemoveDialog]);

  const { onFocus: onFocusAsync, onBlur: onBlurAsync } = useAsyncFocusBlur({ onFocus, onBlur: onSchedulerItemBlur });

  return (
    <>
      <KendoSchedulerItem {...props} onClick={onSchedulerItemClick} onFocus={onFocusAsync} onBlur={onBlurAsync}>
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
                <h5>{dataItem.staff}</h5>
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
                  <span className="col-md-9">Status: {dataItem.status}</span>
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
              <CardHeader>Ref ID: {dataItem.refID}</CardHeader>
              <CardHeader>
                <span className="k-icon k-i-clock" /> Start: {intl.formatDate(zonedStart, 't')}
              </CardHeader>
              <CardHeader>
                <span className="k-icon k-i-clock" /> End: {intl.formatDate(zonedEnd, 't')}
              </CardHeader>
              <CardHeader>Mobile Phone: {dataItem.mobilePhone}</CardHeader>
              <CardHeader>Email: {dataItem.email}</CardHeader>
              <CardHeader>Notes: {dataItem.notes}</CardHeader>
            </CardBody>
          </Card>
        </div>
      </Popup>
    </>
  );
};
