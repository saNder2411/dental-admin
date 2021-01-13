import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Components
import { Loader } from '../../../_components';
// Types
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Action Creators
import { discardAddNewItemToDataAC, cancelEditAC, addItemToEditAC } from '../../../_bus/Entities/EntitiesAC';

interface Props {
  inEdit: boolean | undefined;
  isNewItem: boolean | undefined;
  dataItemID: number;
  isDataItemLoading: boolean;
  isValidFields: boolean;
  entityName: EntitiesKeys;
  onCreateDataItem: () => void;
  onUpdatedDataItem: () => void;
  onDeleteDataItem: () => void;
}

export const ViewActionsControlCell: FC<Props> = ({
  inEdit,
  isNewItem,
  isDataItemLoading,
  isValidFields,
  dataItemID,
  entityName,
  onCreateDataItem,
  onUpdatedDataItem,
  onDeleteDataItem,
}): JSX.Element => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    setShowRemoveDialog(false);
    onDeleteDataItem();
  };

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      {isDataItemLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={isDataItemLoading} themeColor="tertiary" />
      ) : (
        <>
          <button
            className="k-button btn-custom"
            onClick={() => (isNewItem ? onCreateDataItem() : onUpdatedDataItem())}
            disabled={isDataItemLoading || !isValidFields}>
            {isNewItem ? <span className="k-icon k-i-checkmark custom-icon" /> : <span className="k-icon k-i-reload custom-icon" />}
          </button>
          <button
            className="k-button btn-custom"
            onClick={() => (isNewItem ? dispatch(discardAddNewItemToDataAC(dataItemID, entityName)) : dispatch(cancelEditAC(dataItemID, entityName)))}
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
          <button className="k-button btn-custom" onClick={() => dispatch(addItemToEditAC(dataItemID, entityName))}>
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
                <button className="k-button" onClick={onDeleteClick}>
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
