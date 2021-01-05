import React, { FC, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Components
import { Loader } from '../../../_components';
// Types
import { GridCellProps } from './GridItemsTypes';
import { GridDataItem } from '../GridTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
import { StaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
// Actions
import { GridActions } from '../GridActions';
// Helpers
import { getOnFinallyRequestDataItem } from './GridItemsHelpers';
// Hooks
import { useDomainActions } from '../GridHooks';
import { useSelectValidateField } from './GridItemsHooks';
// Selectors
import { selectMemoProcessDataItem, selectDataName } from '../GridSelectors';

export const ActionsControlCell: FC<GridCellProps<GridDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<GridDataItem>(ID), [ID]);
  const dataItem = useSelector(selectDataItem);
  const isValidFields = useSelectValidateField();

  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const gridDataName = useSelector(selectDataName);
  const DomainActions = useDomainActions(gridDataName);
  const dispatch = useDispatch();

  const inEdit = dataItem.inEdit;
  const isNewItem = dataItem.isNew;

  const onAddItemToData = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const newDataItemForApi = others as ServiceDataItem & StaffDataItem & CustomerDataItem & AppointmentDataItem;

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onAddNewItemToData(dispatch, newDataItemForApi)
    );

    setIsDataItemLoading(true);
    DomainActions.createDataItem(dispatch, newDataItemForApi, onFinallyRequestDataItem);
  };

  const onItemUpdated = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const updatedDataItemForApi = others as ServiceDataItem & StaffDataItem & CustomerDataItem & AppointmentDataItem;

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onItemUpdatedAfterEdit(dispatch, updatedDataItemForApi)
    );

    setIsDataItemLoading(true);
    DomainActions.updateDataItem(dispatch, updatedDataItemForApi, onFinallyRequestDataItem);
  };

  const onDeleteItem = () => {
    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onItemRemove(dispatch, dataItem.ID)
    );

    setShowRemoveDialog(false);
    setIsDataItemLoading(true);
    DomainActions.deleteDataItem(dispatch, dataItem.ID, onFinallyRequestDataItem);
  };

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      {isDataItemLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={isDataItemLoading} themeColor="tertiary" />
      ) : (
        <>
          <button
            className="k-button btn-custom"
            onClick={() => (isNewItem ? onAddItemToData() : onItemUpdated())}
            disabled={isDataItemLoading || !isValidFields}>
            {isNewItem ? <span className="k-icon k-i-checkmark custom-icon" /> : <span className="k-icon k-i-reload custom-icon" />}
          </button>
          <button
            className="k-button btn-custom"
            onClick={() => (isNewItem ? GridActions.onDiscardNewItemToData(dispatch, dataItem.ID) : GridActions.onCancelEdit(dispatch, dataItem.ID))}
            disabled={isDataItemLoading}>
            <span className="k-icon k-i-x custom-icon" />
          </button>
        </>
      )}
    </SC.ActionsControlCell>
  ) : (
    <SC.ActionsControlCell className="k-command-cell">
      {isDataItemLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={isDataItemLoading} themeColor="tertiary" />
      ) : (
        <>
          <button className="k-button btn-custom" onClick={() => GridActions.onItemEdit(dispatch, dataItem.ID)}>
            <span className="k-icon k-i-edit custom-icon" />
          </button>
          <button className="k-button btn-custom" onClick={() => setShowRemoveDialog(true)}>
            <span className="k-icon k-i-trash custom-icon" />
          </button>
          {showRemoveDialog && (
            <Dialog title="Please Confirm" onClose={() => setShowRemoveDialog(false)}>
              <p style={{ margin: '25px', textAlign: 'center' }}>Are you sure you want to delete this item?</p>
              <DialogActionsBar>
                <button className="k-button" onClick={() => setShowRemoveDialog(false)}>
                  Cancel
                </button>
                <button className="k-button" onClick={onDeleteItem}>
                  Delete
                </button>
              </DialogActionsBar>
            </Dialog>
          )}
        </>
      )}
    </SC.ActionsControlCell>
  );
};
