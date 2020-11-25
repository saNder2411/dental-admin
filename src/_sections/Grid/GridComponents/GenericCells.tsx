import React, { FC, useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { GenericReferenceInput, GenericTextInput, GenericAvatarInput } from './GenericInputCells';
import { GenericDateInput } from './GenericDateCells';
import { GenericGenderDropDownList, GenericBooleanFlagDropDownList, GenericRoleSkillsMultiSelect } from './GenericDropDownCells';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Helpers
import { isString, isNumber } from './GridComponentsHelpers';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';
// Selectors
import { selectGridMemoDataItem, selectGridDataItemMemoValueForCell } from '../GridSelectors';

export const GenericTextCell: FC<GridCellProps> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';
  const numValue = isNumber(value) ? value : '';
  const resultValue = strValue ? strValue : numValue;

  return <td>{dataItem.inEdit ? <GenericTextInput {...props} value={resultValue} /> : resultValue}</td>;
};

export const GenericReferenceCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const selectDataItemValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem | ServicesDataItem>(ID, field), [ID, field]);
  const gridDataItemValue = useSelector(selectDataItemValue);
  const selectDataItem = useMemo(() => selectGridMemoDataItem<AgendaDataItem | ServicesDataItem>(ID), [ID]);
  const dataItem = useSelector(selectDataItem);

  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const strValue = isString(gridDataItemValue) ? gridDataItemValue : '';

  return dataItem.inEdit ? (
    <td>
      <GenericReferenceInput rowType="" dataItem={dataItem} field={field} onChange={onChange} value={strValue} />
    </td>
  ) : (
    <SC.ReferenceCell ref={anchorRef} id="td-p" onClick={() => setShowPopup((prevState) => !prevState)}>
      {gridDataItemValue}
      <Popup
        show={showPopup}
        anchor={anchorRef.current as HTMLTableDataCellElement}
        style={{ width: anchorRef.current?.offsetWidth }}
        popupClass="popup-content">
        <p>Details reference</p>
        {strValue}...
      </Popup>
    </SC.ReferenceCell>
  );
};

export const GenericStartDateIDCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({ dataItem: { ID }, onChange }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { FilterStart: new Date().toISOString(), inEdit: false };
  const intlService = useInternationalization();
  const value = new Date(dataItem.FilterStart);

  return (
    <td>
      {dataItem.inEdit ? (
        <GenericDateInput
          rowType=""
          dataItem={dataItem as AgendaDataItem | CustomersDataItem}
          field={'FilterStart' as keyof (AgendaDataItem | CustomersDataItem)}
          onChange={onChange}
          value={value}
        />
      ) : (
        intlService.formatDate(value, 'H:mm | dd.MM')
      )}
    </td>
  );
};

export const GenericEndDateIDCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({ dataItem: { ID }, onChange }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { FilterEnd: new Date().toISOString(), inEdit: false };

  const intlService = useInternationalization();
  const value = new Date(dataItem.FilterEnd);

  return (
    <td>
      {dataItem.inEdit ? (
        <GenericDateInput
          rowType=""
          dataItem={dataItem as AgendaDataItem | CustomersDataItem}
          field={'FilterEnd' as keyof (AgendaDataItem | CustomersDataItem)}
          onChange={onChange}
          value={value}
        />
      ) : (
        intlService.formatDate(value, 'H:mm | dd.MM')
      )}
    </td>
  );
};

export const GenericCurrencyIDCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { ServiceCharge: 50 };

  const intlService = useInternationalization();
  const value = dataItem.ServiceCharge;
  const numValue = isNumber(value) ? value : 50;

  return <SC.GenericCurrencyCell isNegativeAmount={numValue < 0}>{intlService.formatNumber(numValue, 'c')}</SC.GenericCurrencyCell>;
};

export const GenericGenderIDCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({ dataItem: { ID }, onChange }): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem(ID), [ID]);
  const gridDataItem = useSelector(selectDataItem);
  const dataItem = gridDataItem ? (gridDataItem as AgendaDataItem) : { Gender: '(1) Female', inEdit: false };

  const value = dataItem.Gender ? dataItem.Gender : '(1) Female';

  return (
    <td>
      {dataItem.inEdit ? (
        <GenericGenderDropDownList
          rowType=""
          dataItem={dataItem as AgendaDataItem | CustomersDataItem}
          field="Gender"
          onChange={onChange}
          value={value}
        />
      ) : (
        value
      )}
    </td>
  );
};

export const GenericAvatarCell: FC<GridCellProps<TeamStaffDataItem | CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';
  const placeholderImageUrl = dataItem.Gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') ? strValue : placeholderImageUrl;

  return dataItem.inEdit ? (
    <td>
      <GenericAvatarInput {...props} value={strValue} />
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const GenericDateCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const intlService = useInternationalization();
  const value = new Date(dataItem[field] as string);

  return <td>{dataItem.inEdit ? <GenericDateInput {...props} value={value} /> : intlService.formatDate(value, 'H:mm | dd.MM')}</td>;
};

export const GenericCurrencyCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem, field }): JSX.Element => {
  const intlService = useInternationalization();
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 50;

  return <SC.GenericCurrencyCell isNegativeAmount={numValue < 0}>{intlService.formatNumber(numValue, 'c')}</SC.GenericCurrencyCell>;
};

export const GenericGenderCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field] ? (dataItem[field] as string) : '(1) Female';

  return <td>{dataItem.inEdit ? <GenericGenderDropDownList {...props} value={value} /> : value}</td>;
};

export const GenericBooleanFlagCell: FC<GridCellProps<ServicesDataItem | TeamStaffDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];
  const flag = !!value;

  return dataItem.inEdit ? (
    <td>
      <GenericBooleanFlagDropDownList {...props} value={flag} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={flag}>
      <span className={flag ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const GenericRoleSkillsCell: FC<GridCellProps<TeamStaffDataItem | ServicesDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const currentRoleSkills = dataItem.RoleSkills;
  const value = currentRoleSkills.join(' | ');

  return <td>{dataItem.inEdit ? <GenericRoleSkillsMultiSelect {...props} value={currentRoleSkills} /> : value}</td>;
};
