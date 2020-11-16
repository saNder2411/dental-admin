import React, { FC, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { Loader } from '../../../_components';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { GridDataItem, GridDataName } from '../GridTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
// Selectors
import { selectGridActions, selectGridEditField, selectGridDataName } from '../GridSelectors';
import { selectServicesActions } from '../../../Services/ServicesSelectors';
// Helpers
import { getOnFinallyRequestDataItem } from './GridComponentsHelpers';

export const ActionsControlCell: FC<GridCellProps<GridDataItem>> = ({ dataItem }): JSX.Element => {
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
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

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => onAddNewItemToData(dispatch, dataItem)
    );

    setIsDataItemLoading(true);

    switch (gridDataName) {
      case GridDataName.Services:
        createService(dispatch, newDataItemForApi as ServicesDataItem, onFinallyRequestDataItem);
        break;
    }
  };

  const onItemUpdated = () => {
    const { inEdit, isNew, ...others } = dataItem;
    const updatedDataItemForApi = others;

    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => onItemUpdatedAfterEdit(dispatch, dataItem)
    );

    setIsDataItemLoading(true);

    switch (gridDataName) {
      case GridDataName.Services:
        updateService(dispatch, updatedDataItemForApi as ServicesDataItem, onFinallyRequestDataItem);
        break;
    }
  };

  const onDeleteItem = () => {
    const onFinallyRequestDataItem = getOnFinallyRequestDataItem(
      () => setIsDataItemLoading(false),
      () => onItemRemove(dispatch, dataItem)
    );

    setIsDataItemLoading(true);

    switch (gridDataName) {
      case GridDataName.Services:
        deleteService(dispatch, dataItem.ID, onFinallyRequestDataItem);
        break;
    }
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
            onClick={() => (isNewItem ? onDiscardNewItemToData(dispatch, dataItem) : onCancelEdit(dispatch, dataItem))}
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
          <button className="k-button" onClick={() => onItemEdit(dispatch, dataItem)}>
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
