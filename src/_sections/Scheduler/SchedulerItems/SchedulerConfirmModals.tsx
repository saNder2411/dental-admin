import React, { FC } from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// Components
import { Loader } from '../../../_components';

interface ConfirmModalProps {
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

interface RemoveConfirmModalProps extends ConfirmModalProps {
  isDataItemLoading: boolean;
}

export const RemoveConfirmModal: FC<RemoveConfirmModalProps> = ({ isDataItemLoading, onClose, onCancel, onConfirm }) => {
  return (
    <Dialog title="Delete Event" onClose={onClose}>
      <p style={{ margin: 25, textAlign: 'center' }}>Are you sure you want to delete this event?</p>
      <DialogActionsBar>
        <button className="k-button" onClick={onCancel} disabled={isDataItemLoading}>
          Cancel
        </button>
        <button className="k-button" onClick={onConfirm} disabled={isDataItemLoading}>
          {isDataItemLoading ? (
            <Loader className="d-flex justify-content-center align-items-center" type="pulsing" isLoading={isDataItemLoading} themeColor="primary" />
          ) : (
            `Delete`
          )}
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export const RemoveOccurrenceConfirmModal: FC<ConfirmModalProps> = ({ onClose, onCancel, onConfirm }) => {
  return (
    <Dialog title="Delete Recurring Item" onClose={onClose}>
      <p style={{ margin: 25, textAlign: 'center' }}>Do you want to delete only this event occurrence or the whole series?</p>
      <DialogActionsBar>
        <button className="k-button" onClick={onCancel}>
          Delete current occurrence
        </button>
        <button className="k-button" onClick={onConfirm}>
          Delete the series
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export const EditOccurrenceConfirmModal: FC<ConfirmModalProps> = ({ onClose, onCancel, onConfirm }) => {
  return (
    <Dialog title="Edit Recurring Item" onClose={onClose}>
      <p style={{ margin: 25, textAlign: 'center' }}>Do you want to edit only this event occurrence or the whole series?</p>
      <DialogActionsBar>
        <button className="k-button" onClick={onCancel}>
          Edit current occurrence
        </button>
        <button className="k-button" onClick={onConfirm}>
          Edit the series
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

interface CancelDragModalProps {
  onClose: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

export const CancelDragModal: FC<CancelDragModalProps> = ({ onClose, onCancel, title, message }) => {
  return (
    <Dialog title={title} onClose={onClose}>
      <p style={{ margin: 25, textAlign: 'center' }}>{message}</p>
      <DialogActionsBar>
        {/* <button className="k-button" onClick={onCancel}>
          Confirm
        </button> */}
        <button className="k-button" onClick={onCancel}>
          OK
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};
