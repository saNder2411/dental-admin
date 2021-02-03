import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';

// Selectors
import { selectDataErrorMessage, selectDataItemErrorMessage } from '../_bus/UI/UISelectors';

export const ErrorIndictor = () => {
  const [showDataError, setShowDataError] = useState(true);
  const [showDataItemError, setShowDataItemError] = useState(true);
  const dataErrorMessage = useSelector(selectDataErrorMessage);
  const dataItemErrorMessage = useSelector(selectDataItemErrorMessage);

  useEffect(() => {
    let delay: NodeJS.Timeout;
    if (dataErrorMessage) {
      delay = setTimeout(() => setShowDataError(false), 4000);
    }
    return () => clearTimeout(delay);
  }, [dataErrorMessage]);

  useEffect(() => {
    let delay: NodeJS.Timeout;
    if (dataItemErrorMessage) {
      delay = setTimeout(() => setShowDataItemError(false), 4000);
    }
    return () => clearTimeout(delay);
  }, [dataItemErrorMessage]);

  return (
    <NotificationGroup style={{ top: 90, right: 10, alignItems: 'flex-start', flexWrap: 'wrap-reverse' }}>
      <Fade enter={true} exit={true}>
        {dataErrorMessage && showDataError && (
          <Notification type={{ style: 'error', icon: true }} closable={true} onClose={() => setShowDataError(false)}>
            <span>{dataErrorMessage}</span>
          </Notification>
        )}
      </Fade>
      <Fade enter={true} exit={true}>
        {dataItemErrorMessage && showDataItemError && (
          <Notification type={{ style: 'error', icon: true }} closable={true} onClose={() => setShowDataItemError(false)}>
            <span>{dataItemErrorMessage}</span>
          </Notification>
        )}
      </Fade>
    </NotificationGroup>
  );
};
