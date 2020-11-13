import React, { FC } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { GridDataItem, GridDataName } from '../GridTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Selectors
import { selectGridActions, selectGridEditField, selectGridDataName } from '../GridSelectors';
import { selectServicesActions } from '../../../Services/ServicesSelectors';

export const ActionsControlCell: FC<GridCellProps<GridDataItem>> = ({ dataItem }): JSX.Element => {
  const { onItemEdit, onItemUpdatedAfterEdit, onItemRemove, onCancelEdit, onAddNewItemToData, onDiscardNewItemToData } = useSelector(
    selectGridActions,
    shallowEqual
  );
  const editField = useSelector(selectGridEditField);
  const { createService, updateService, deleteService } = useSelector(selectServicesActions, shallowEqual);
  const gridDataName = useSelector(selectGridDataName);
  const dispatch = useDispatch();
  const inEdit = dataItem[editField];
  const isNewItem = dataItem.isNew;

  const onAddItemToData = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const newDataItemForApi = others;

    onAddNewItemToData(dispatch, dataItem);

    switch (gridDataName) {
      case GridDataName.Services:
        createService(dispatch, newDataItemForApi as ServicesDataItem);
        break;
    }
  };

  const onItemUpdated = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const updatedDataItemForApi = others;

    onItemUpdatedAfterEdit(dispatch, dataItem);

    switch (gridDataName) {
      case GridDataName.Services:
        updateService(dispatch, updatedDataItemForApi as ServicesDataItem);
        break;
    }
  };

  const onDeleteItem = () => {
    onItemRemove(dispatch, dataItem);

    switch (gridDataName) {
      case GridDataName.Services:
        deleteService(dispatch, dataItem.ID);
        break;
    }
  };

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      <button className="k-button" onClick={() => (isNewItem ? onAddItemToData() : onItemUpdated())}>
        {isNewItem ? <span className="k-icon k-i-checkmark" /> : <span className="k-icon k-i-reload" />}
      </button>
      <button className="k-button" onClick={() => (isNewItem ? onDiscardNewItemToData(dispatch, dataItem) : onCancelEdit(dispatch, dataItem))}>
        <span className="k-icon k-i-x" />
      </button>
    </SC.ActionsControlCell>
  ) : (
    <SC.ActionsControlCell className="k-command-cell">
      <button className="k-button" onClick={() => onItemEdit(dispatch, dataItem)}>
        <span className="k-icon k-i-edit" />
      </button>
      <button className="k-button" onClick={onDeleteItem}>
        <span className="k-icon k-i-trash" />
      </button>
    </SC.ActionsControlCell>
  );
};
