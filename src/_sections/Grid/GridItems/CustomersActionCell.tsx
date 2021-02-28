import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../_bus/_Customers/CustomersTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Actions
import { createCustomerDataItemInitAsyncAC, updateCustomerDataItemInitAsyncAC, deleteCustomerDataItemInitAsyncAC } from '../../../_bus/Entities/EntitiesAC';
// Selectors
import { selectMemoProcessDataItem, selectAppointmentsById, selectServicesById, selectStaffById, selectCustomersById } from '../../../_bus/Entities/EntitiesSelectors';
// Hooks
import { usePhoneFieldsValidation } from '../GridHooks';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const CustomersActionsControlCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<CustomerDataItem>(ID, EntitiesKeys.Customers), [ID]);
  const dataItem = useSelector(selectDataItem);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();
  const isValidMobilePhone = usePhoneFieldsValidation(phoneValidator(dataItem.CellPhone));

  const appointmentsById = useSelector(selectAppointmentsById());
  const servicesById = useSelector(selectServicesById());
  const staffById = useSelector(selectStaffById());
  const customersById = useSelector(selectCustomersById());

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(createCustomerDataItemInitAsyncAC({ ...dataItem, Modified: new Date().toISOString() }, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateCustomerDataItemInitAsyncAC({ ...dataItem, Modified: new Date().toISOString() }, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onDeleteDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(deleteCustomerDataItemInitAsyncAC(dataItem, appointmentsById, servicesById, staffById, customersById, () => setIsDataItemLoading(false)));
  }, [appointmentsById, customersById, dataItem, dispatch, servicesById, staffById]);

  return (
    <ViewActionsControlCell
      inEdit={dataItem.inEdit}
      isNewItem={dataItem.isNew}
      dataItemID={dataItem.ID}
      isDataItemLoading={isDataItemLoading}
      isValidFields={isValidMobilePhone}
      entityName={EntitiesKeys.Customers}
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
