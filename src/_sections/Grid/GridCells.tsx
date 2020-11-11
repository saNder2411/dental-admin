import React, { useState, useRef, SyntheticEvent, ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInternationalization } from '@progress/kendo-react-intl';
import { GridCellProps } from '@progress/kendo-react-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { DropDownList, DropDownListChangeEvent, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
import { Input, NumericTextBox, NumericTextBoxChangeEvent } from '@progress/kendo-react-inputs';
import { Popup } from '@progress/kendo-react-popup';
// Instruments
import { IconBook } from '../../_instruments';
// Types
import { StatusNames } from '../../Agenda/AgendaTypes';
// Styled Components
import * as SC from './GridStyledComponents/GridCellsStyled';
// Images
import MalePhotoPlaceholder from '../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../_assets/customers/female_placeholder.jpg';
// Selectors
import { selectGridState } from '.';
import { selectTeamStaffState } from '../../TeamStaff';
import { selectCustomersState } from '../../Customers';
import { selectServicesState } from '../../Services';

const statusList = Object.values(StatusNames).map((status) => ({ status, value: status }));

type GridCell = (props: GridCellProps) => JSX.Element | null;

interface InputChangeEvent extends ChangeEvent<HTMLInputElement> {
  nativeEvent: Event;
  syntheticEvent: SyntheticEvent;
  target: HTMLInputElement;
  value: string;
}

export const StatusCell: GridCell = ({ dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''];
  const dropDownListValue = statusList.find(({ status }) => status === value);

  const onStatusChange = (evt: DropDownListChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.value });

  return (
    <td>{dataItem.inEdit ? <DropDownList onChange={onStatusChange} value={dropDownListValue} data={statusList} textField={field} /> : value}</td>
  );
};

export const SvcStaffCell: GridCell = ({ dataItem, field, onChange }) => {
  const { data } = useSelector(selectTeamStaffState);
  const teamStaffNameList = data.map(({ lastName }) => ({ [field ? field : '']: lastName, value: lastName }));
  const value = dataItem[field ? field : ''];
  const dropDownListValue = teamStaffNameList.find((item) => item.value === value);

  const onSvcStaffChange = (evt: DropDownListChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.value });

  return (
    <td>
      {dataItem.inEdit ? <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={teamStaffNameList} textField={field} /> : value}
    </td>
  );
};

export const FullNameCell: GridCell = ({ dataItem, field, onChange }) => {
  const { data } = useSelector(selectCustomersState);
  const customerNameList = data.map(({ lastName, firstName }) => ({
    [field ? field : '']: `${firstName} ${lastName}`,
    value: `${firstName} ${lastName}`,
  }));
  const value = dataItem[field ? field : ''];
  const dropDownListValue = customerNameList.find((item) => item.value === value);

  const onLastNameChange = (evt: DropDownListChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.value });

  return (
    <td>
      {dataItem.inEdit ? <DropDownList onChange={onLastNameChange} value={dropDownListValue} data={customerNameList} textField={field} /> : value}
    </td>
  );
};

export const ServicesCell: GridCell = ({ dataItem, field, onChange }) => {
  const { data } = useSelector(selectServicesState);
  const serviceReferenceList = data.map(({ references }) => ({ [field ? field : '']: references, value: references }));
  const value = dataItem[field ? field : ''] as string;
  const dropDownListValue = value
    ? value.split(`, `).map((value) => ({ [field ? field : '']: value, value }))
    : [{ [field ? field : '']: value, value }];
  const [multiSelectValue, setMultiSelectValue] = useState<{ [key: string]: string; value: string }[]>(dropDownListValue);

  useEffect(() => {
    let isNewItem = !!!value;

    if (isNewItem) {
      setMultiSelectValue([]);
      isNewItem = false;
    }
  }, [value]);

  const onServicesChange = (evt: MultiSelectChangeEvent) => {
    setMultiSelectValue([...evt.target.value]);
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value).join(', ') });
  };
  return (
    <td>
      {dataItem.inEdit ? <MultiSelect onChange={onServicesChange} value={multiSelectValue} data={serviceReferenceList} textField={field} /> : value}
    </td>
  );
};

export const BooleanFlagCell: GridCell = ({ dataItem, field, onChange }) => {
  const flag = dataItem[field ? field : ''] ? dataItem[field ? field : ''] : false;
  const localizedDataForFlagCell = [
    { [field ? field : '']: 'yes', value: true },
    { [field ? field : '']: 'no', value: false },
  ];
  const dropDownListValue = localizedDataForFlagCell.find(({ value }) => value === flag);

  const onBooleanFlagChange = (evt: DropDownListChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.value });

  return dataItem.inEdit ? (
    <td>
      <DropDownList onChange={onBooleanFlagChange} value={dropDownListValue} data={localizedDataForFlagCell} textField={field} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={flag}>
      <span className={flag ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const GenderCell: GridCell = ({ dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''] ? dataItem[field ? field : ''] : 'Female';
  const localizedDataForGenderCell = [
    { [field ? field : '']: 'Female', value: 'Female' },
    { [field ? field : '']: 'Male', value: 'Male' },
  ];
  const dropDownListValue = localizedDataForGenderCell.find((item) => item.value === value);

  const onGenderChange = (evt: DropDownListChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.value });

  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList onChange={onGenderChange} value={dropDownListValue} data={localizedDataForGenderCell} textField={field} />
      ) : (
        value
      )}
    </td>
  );
};

export const ReferenceCell: GridCell = ({ dataItem, field, onChange }) => {
  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const value = dataItem[field ? field : ''];

  const onReferenceChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <Input value={value} placeholder="Ref: TBA-000" onChange={onReferenceChange} />
    </td>
  ) : (
    <SC.ReferenceCell ref={anchorRef} id="td-p" onClick={() => setShowPopup((prevState) => !prevState)}>
      {value}
      <Popup
        show={showPopup}
        anchor={anchorRef.current as HTMLTableDataCellElement}
        style={{ width: anchorRef.current?.offsetWidth }}
        popupClass="popup-content">
        <p>Details reference</p>
        {value}...
      </Popup>
    </SC.ReferenceCell>
  );
};

export const AvatarCell: GridCell = ({ dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''] as string;
  const placeholderImageUrl = dataItem.gender === 'Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = value.includes('png') || value.includes('jpg') || value.includes('jpeg') ? value : placeholderImageUrl;

  const onAvatarChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <Input value={value} onChange={onAvatarChange} />
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const ServicesIconCell: GridCell = ({ dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''];
  const isImageUrl = value && (value.includes('png') || value.includes('jpg') || value.includes('jpeg'));
  console.log(value);

  const onServicesIconChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <Input value={value} onChange={onServicesIconChange} />
    </td>
  ) : isImageUrl ? (
    <SC.ServicesImageCell imageUrl={value}>
      <div className="Grid__serviceImage" />
    </SC.ServicesImageCell>
  ) : (
    <SC.ServicesIconCell>
      <FontAwesomeIcon className="grid__icon" icon={IconBook[StatusNames.Tooth].icon} color={IconBook[StatusNames.Tooth].statusColor} />
    </SC.ServicesIconCell>
  );
};

export const DiscountCell: GridCell = ({ dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''];

  const onDiscountChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value });

  return (
    <td>
      {dataItem.inEdit ? (
        <NumericTextBox value={value} step={0.01} min={0} onChange={onDiscountChange} />
      ) : (
        <span>{`${value ? value * 100 : `0`}%`}</span>
      )}
    </td>
  );
};

export const DurationCell: GridCell = ({ dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''];

  const onDurationChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value });

  return <td>{dataItem.inEdit ? <NumericTextBox value={value} step={5} min={5} onChange={onDurationChange} /> : <span>{value}</span>}</td>;
};

export const DateCell: GridCell = ({ dataItem, field, onChange }) => {
  const intlService = useInternationalization();
  const value = new Date(dataItem[field ? field : '']);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value });

  return <td>{dataItem.inEdit ? <DateTimePicker value={value} onChange={onDateChange} /> : intlService.formatDate(value, 'H:mm | dd.MM')}</td>;
};

export const CurrencyCell: GridCell = ({ dataItem, field }) => {
  const intlService = useInternationalization();
  const value = dataItem[field ? field : ''] ? dataItem[field ? field : ''] : 50;

  return <SC.CurrencyCell isNegativeAmount={value < 0}>{intlService.formatNumber(value, 'c')}</SC.CurrencyCell>;
};

export const TotalPriceCell: GridCell = ({ dataItem }) => {
  const intlService = useInternationalization();
  const value = dataItem.price ? dataItem.price - dataItem.price * dataItem.discount : 0;

  return (
    <SC.CurrencyCell isNegativeAmount={value < 0}>
      <span>{intlService.formatNumber(value, 'c')}</span>
    </SC.CurrencyCell>
  );
};

export const StatusIcon: GridCell = ({ dataItem, field }) => {
  const iconName = dataItem[field ? field : ''] as StatusNames;

  return (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconBook[iconName].icon} style={IconBook[iconName].style} />
    </SC.StatusIcon>
  );
};

export const ActionsControlCell: GridCell = ({ dataItem }) => {
  const { editField, onItemEdit, onItemUpdatedAfterEdit, onItemRemove, onCancelEdit, onAddNewItemToData, onDiscardNewItemToData } = useSelector(
    selectGridState
  );
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
