import React, { FC, useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Components
import { GenericGenderDropDownList, GenericBooleanFlagDropDownList, GenericRoleSkillsMultiSelect } from './StaffDropDownCells';
// Types
import { GenericDataItem, EntitiesKeys } from '../GridTypes';
import { GridCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../_bus/Appointments/AppointmentsTypes';
import { ServiceDataItem } from '../../../_bus/Services/ServicesTypes';
import { CustomerDataItem } from '../../../_bus/Customers/CustomersTypes';
import { StaffDataItem } from '../../../_bus/Staff/StaffTypes';
// Selectors
import { selectProcessDataItemFieldValue } from '../GridSelectors';
// Helpers
import { isString, isNumber } from './GridItemsHelpers';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';


export const GenericRoleSkillsCell: FC<GridCellProps<StaffDataItem | ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem | StaffDataItem, string[] | null>(ID, field);
  const value = cellValue ? cellValue.join(' | ') : '';

  return <td>{dataItemInEditValue ? <GenericRoleSkillsMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} /> : value}</td>;
};
