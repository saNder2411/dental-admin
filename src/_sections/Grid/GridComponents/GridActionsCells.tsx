import React, { FC } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { GridDataItem } from '../GridTypes';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Selectors
import { selectGridActions, selectGridEditField } from '../GridSelectors';

export const ActionsControlCell: FC<GridCellProps<GridDataItem>> = ({ dataItem }): JSX.Element => {
  const { onItemEdit, onItemUpdatedAfterEdit, onItemRemove, onCancelEdit, onAddNewItemToData, onDiscardNewItemToData } = useSelector(
    selectGridActions,
    shallowEqual
  );
  const editField = useSelector(selectGridEditField);
  const dispatch = useDispatch();
  const inEdit = dataItem[editField];
  const isNewItem = dataItem.isNew;

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      <button className="k-button" onClick={() => (isNewItem ? onAddNewItemToData(dispatch, dataItem) : onItemUpdatedAfterEdit(dispatch, dataItem))}>
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
      <button className="k-button" onClick={() => onItemRemove(dispatch, dataItem)}>
        <span className="k-icon k-i-trash" />
      </button>
    </SC.ActionsControlCell>
  );
};
