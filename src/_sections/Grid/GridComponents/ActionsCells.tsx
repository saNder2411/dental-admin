import React, { FC, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { Loader } from '../../../_components';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { GridDataItem } from '../GridTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
// Actions
import { GridActions } from '../GridActions';
// Helpers
import { getOnFinallyRequestDataItem } from './GridComponentsHelpers';
// Hooks
import { useGridStateForActionsCell, useDomainActions } from '../GridHooks';
// Selectors
import { selectGridMemoDataItem } from '../GridSelectors';

export const ActionsControlCell: FC<GridCellProps<GridDataItem>> = ({ dataItem }): JSX.Element => {
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const { editField, gridDataName } = useGridStateForActionsCell();
  const DomainActions = useDomainActions(gridDataName);
  const dispatch = useDispatch();

  const inEdit = dataItem[editField];
  const isNewItem = dataItem.isNew;

  const onAddItemToData = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const newDataItemForApi = others as ServicesDataItem & TeamStaffDataItem & CustomersDataItem & AgendaDataItem;

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onAddNewItemToData(dispatch, dataItem)
    );

    setIsDataItemLoading(true);
    GridActions.setIsGridDataItemLoading(dispatch, true);
    DomainActions.createDataItem(dispatch, newDataItemForApi, onFinallyRequestDataItem);
  };

  const onItemUpdated = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const updatedDataItemForApi = others as ServicesDataItem & TeamStaffDataItem & CustomersDataItem & AgendaDataItem;

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onItemUpdatedAfterEdit(dispatch, dataItem)
    );

    setIsDataItemLoading(true);
    GridActions.setIsGridDataItemLoading(dispatch, true);
    DomainActions.updateDataItem(dispatch, updatedDataItemForApi, onFinallyRequestDataItem);
  };

  const onDeleteItem = () => {
    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onItemRemove(dispatch, dataItem)
    );

    setIsDataItemLoading(true);
    GridActions.setIsGridDataItemLoading(dispatch, true);
    DomainActions.deleteDataItem(dispatch, dataItem.ID, onFinallyRequestDataItem);
  };

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      {isDataItemLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={isDataItemLoading} themeColor="tertiary" />
      ) : (
        <>
          <button className="k-button" onClick={() => (isNewItem ? onAddItemToData() : onItemUpdated())} disabled={isDataItemLoading}>
            {isNewItem ? <span className="k-icon k-i-checkmark" /> : <span className="k-icon k-i-reload" />}
          </button>
          <button
            className="k-button"
            onClick={() => (isNewItem ? GridActions.onDiscardNewItemToData(dispatch, dataItem) : GridActions.onCancelEdit(dispatch, dataItem))}
            disabled={isDataItemLoading}>
            <span className="k-icon k-i-x" />
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
          <button className="k-button" onClick={() => GridActions.onItemEdit(dispatch, dataItem)}>
            <span className="k-icon k-i-edit" />
          </button>
          <button className="k-button" onClick={onDeleteItem}>
            <span className="k-icon k-i-trash" />
          </button>
        </>
      )}
    </SC.ActionsControlCell>
  );
};

export const ActionsControlIDCell: FC<GridCellProps<GridDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? gridDataItem : ({ isNew: false, inEdit: false } as any);

  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const { editField, gridDataName } = useGridStateForActionsCell();
  const DomainActions = useDomainActions(gridDataName);
  const dispatch = useDispatch();

  const inEdit = dataItem[editField];
  const isNewItem = dataItem.isNew;

  const onAddItemToData = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const newDataItemForApi = others as ServicesDataItem & TeamStaffDataItem & CustomersDataItem & AgendaDataItem;

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onAddNewItemToData(dispatch, dataItem)
    );

    setIsDataItemLoading(true);
    GridActions.setIsGridDataItemLoading(dispatch, true);
    DomainActions.createDataItem(dispatch, newDataItemForApi, onFinallyRequestDataItem);
  };

  const onItemUpdated = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const updatedDataItemForApi = others as ServicesDataItem & TeamStaffDataItem & CustomersDataItem & AgendaDataItem;

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onItemUpdatedAfterEdit(dispatch, dataItem)
    );

    setIsDataItemLoading(true);
    GridActions.setIsGridDataItemLoading(dispatch, true);
    DomainActions.updateDataItem(dispatch, updatedDataItemForApi, onFinallyRequestDataItem);
  };

  const onDeleteItem = () => {
    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => GridActions.onItemRemove(dispatch, dataItem)
    );

    setIsDataItemLoading(true);
    GridActions.setIsGridDataItemLoading(dispatch, true);
    DomainActions.deleteDataItem(dispatch, dataItem.ID, onFinallyRequestDataItem);
  };

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      {isDataItemLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={isDataItemLoading} themeColor="tertiary" />
      ) : (
        <>
          <button className="k-button" onClick={() => (isNewItem ? onAddItemToData() : onItemUpdated())} disabled={isDataItemLoading}>
            {isNewItem ? <span className="k-icon k-i-checkmark" /> : <span className="k-icon k-i-reload" />}
          </button>
          <button
            className="k-button"
            onClick={() => (isNewItem ? GridActions.onDiscardNewItemToData(dispatch, dataItem) : GridActions.onCancelEdit(dispatch, dataItem))}
            disabled={isDataItemLoading}>
            <span className="k-icon k-i-x" />
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
          <button className="k-button" onClick={() => GridActions.onItemEdit(dispatch, dataItem)}>
            <span className="k-icon k-i-edit" />
          </button>
          <button className="k-button" onClick={onDeleteItem}>
            <span className="k-icon k-i-trash" />
          </button>
        </>
      )}
    </SC.ActionsControlCell>
  );
};
