import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { GridCellProps, EditCellDropDownListProps } from './GridItemsTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectGridDataItemIsLoading, selectGridDataItemMemoValueForCell } from '../GridSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
// Helpers
import { onGridDropDownChange, transformTeamStaffDataToMultiSelectData } from './GridItemsHelpers';

export const CustomersSvcStaffDropDownList: FC<GridCellProps<CustomersDataItem>> = ({ dataItem: { ID }, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const selectDataItemValue = useMemo(() => selectGridDataItemMemoValueForCell<CustomersDataItem>(memoID, memoField), [memoField, memoID]);
  const cellValue = useSelector(selectDataItemValue) as string;

  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const staffNameList = teamStaffData.map(({ Title }) => Title);
  const dataForDropdownList = staffNameList.map((lastName) => ({ [field]: lastName, value: lastName }));
  const dropDownListValue = dataForDropdownList.find((item) => item.value === cellValue);
  const onSvcStaffChange = onGridDropDownChange<CustomersDataItem>(memoID, field, onChange);

  return (
    <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={dataForDropdownList} textField={field} disabled={isDataItemLoading} />
  );
};

export const CustomersLastAppointmentsMultiSelect: FC<EditCellDropDownListProps<CustomersDataItem, TeamStaffDataItem[], TeamStaffDataItem[]>> = ({
  dataItemID,
  field,
  onChange,
  value,
  domainData,
}): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const multiSelectData = domainData ? transformTeamStaffDataToMultiSelectData(domainData) : [];
  const dropDownListValue = transformTeamStaffDataToMultiSelectData(value);

  const onAppointmentChange = (evt: MultiSelectChangeEvent) => {
    onChange({
      dataItem: dataItemID,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: { results: evt.target.value.map(({ value }) => value) },
    });
  };
  return (
    <MultiSelect onChange={onAppointmentChange} value={dropDownListValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />
  );
};
