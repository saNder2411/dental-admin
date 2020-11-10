import React, { useState, useRef, SyntheticEvent, ChangeEvent } from 'react';
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
import AnyStylist from '../../_assets/stylists/Any-Stylist-Portrait-85x85.png';
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
    <td>{dataItem.inEdit ? <DropDownList onChange={onStatusChange} value={dropDownListValue} data={statusList} textField={'status'} /> : value}</td>
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
      {dataItem.inEdit ? (
        <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={teamStaffNameList} textField={'svcStaff'} />
      ) : (
        value
      )}
    </td>
  );
};

export const LastNameCell: GridCell = ({ dataItem, field, onChange }) => {
  const { data } = useSelector(selectCustomersState);
  const customerNameList = data.map(({ lastName, firstName }) => ({ [field ? field : '']: `${firstName} ${lastName}`, value: lastName }));
  const value = dataItem[field ? field : ''];
  const dropDownListValue = customerNameList.find((item) => item.value === value);

  const onLastNameChange = (evt: DropDownListChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.value });

  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList onChange={onLastNameChange} value={dropDownListValue} data={customerNameList} textField={'lastName'} />
      ) : (
        value
      )}
    </td>
  );
};

export const ServicesCell: GridCell = ({ dataItem, field, onChange }) => {
  const { data } = useSelector(selectServicesState);
  const serviceReferenceList = data.map(({ references }) => ({ [field ? field : '']: references, value: references }));
  const value = dataItem[field ? field : ''];
  const dropDownListValue = serviceReferenceList.find((item) => item.value === value);
  const [multiSelectValue, setMultiSelectValue] = useState([dropDownListValue ? dropDownListValue : { [field ? field : '']: value, value }]);

  const onServicesChange = (evt: MultiSelectChangeEvent) => {
    setMultiSelectValue([...evt.target.value]);
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value).join(', ') });
  };
  return (
    <td>
      {dataItem.inEdit ? (
        <MultiSelect onChange={onServicesChange} value={multiSelectValue} data={serviceReferenceList} textField={'services'} />
      ) : (
        value
      )}
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

  const onReferenceChange = (evt: InputChangeEvent) => {
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value });
  };

  return dataItem.inEdit ? (
    <td>
      <Input value={value} onChange={onReferenceChange} />
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

export const DiscountCell: GridCell = ({ dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''];

  const onDiscountChange = (evt: NumericTextBoxChangeEvent) => {
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value });
  };

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

  const onDurationChange = (evt: NumericTextBoxChangeEvent) => {
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value });
  };

  return <td>{dataItem.inEdit ? <NumericTextBox value={value} step={5} min={5} onChange={onDurationChange} /> : <span>{value}</span>}</td>;
};

export const DateCell: GridCell = ({ dataItem, field, onChange }) => {
  const intlService = useInternationalization();
  const value = new Date(dataItem[field ? field : '']);

  const onDateChange = (evt: DateTimePickerChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value });

  return <td>{dataItem.inEdit ? <DateTimePicker value={value} onChange={onDateChange} /> : intlService.formatDate(value, 'H:mm / dd.MM')}</td>;
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

export const StatusIcon: GridCell = ({ dataItem }) => {
  const iconName = dataItem.status as StatusNames;

  return (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconBook[iconName].icon} style={IconBook[iconName].style} />
    </SC.StatusIcon>
  );
};

export const ServicesIcon: GridCell = ({ dataItem }) => {
  const iconName = dataItem.offerIconName ? dataItem.offerIconName : StatusNames.Tooth;
  return (
    <SC.ServicesIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconBook[iconName as StatusNames].icon} color={IconBook[iconName as StatusNames].statusColor} />
    </SC.ServicesIcon>
  );
};

export const PhotoCell: GridCell = ({ dataItem }) => {
  const placeholderImageUrl = dataItem.photo ? dataItem.photo : AnyStylist;
  return (
    <SC.PhotoCell imageUrl={placeholderImageUrl}>
      <div className="grid__stylist-photo" />
    </SC.PhotoCell>
  );
};

export const CustomerPhotoCell: GridCell = ({ dataItem }) => {
  const placeholderImageUrl = dataItem.gender === 'Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = dataItem.photo ? dataItem.photo : placeholderImageUrl;

  return (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="grid__stylist-photo" />
    </SC.PhotoCell>
  );
};

export const ActionsControlCell: GridCell = ({ dataItem }) => {
  const { editField, onItemEdit, onItemUpdatedAfterEdit, onItemRemove, onCancelEdit, onAddNewItemToData, onDiscardNewItemToData } = useSelector(
    selectGridState
  );
  const dispatch = useDispatch();
  const inEdit = dataItem[editField];
  const isNewItem = dataItem.id === -1;

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      <button className="k-button" onClick={() => (isNewItem ? onAddNewItemToData(dispatch, dataItem) : onItemUpdatedAfterEdit(dispatch, dataItem))}>
        {isNewItem ? <span className="k-icon k-i-plus-circle" /> : <span className="k-icon k-i-reload" />}
      </button>
      <button className="k-button" onClick={() => (isNewItem ? onDiscardNewItemToData(dispatch, dataItem) : onCancelEdit(dispatch, dataItem))}>
        <span className="k-icon k-i-cancel-outline" />
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
