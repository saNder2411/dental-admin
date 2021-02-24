import React, { FC, useMemo, useCallback, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FieldWrapper } from '@progress/kendo-react-form';
import {
  DropDownList,
  MultiSelect,
  ComboBox,
  MultiSelectChangeEvent,
  DropDownListChangeEvent,
  ComboBoxChangeEvent,
  ComboBoxFilterChangeEvent,
} from '@progress/kendo-react-dropdowns';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { FieldRenderProps, Field, FieldProps } from '@progress/kendo-react-form';
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs';
// Types
import { CustomFieldRenderProps } from '../SchedulerItemTypes';
import { WeekdayTypesType } from './SchedulerFormTypes';
// Selectors
import {
  selectStaffForDropDownListData,
  selectStaffLastNameByID,
  selectCustomersForDropDownListData,
  // selectCustomersById,
  selectCustomerFullNameByID,
  selectServicesForDropDownListData,
} from '../../../../_bus/Entities/EntitiesSelectors';
// Helpers
import { getFormInputOptionalProps } from '../../SchedulerHelpers';
import { EmptyDropDownListDataItem } from '../../../Grid/GridItems/GridItemsHelpers';
// Instruments
import { WeekdayButtonGroupData } from './SchedulerFormInstruments';

export const CustomMemoField: FC<FieldProps> = memo((props) => <Field {...props} />);

export const ServicesFormMultiSelect: FC<FieldRenderProps> = memo((props) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, value, onChange, ...others } = props;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(props);
  const LookupMultiBP01offeringsId = value as { results: number[] };

  const selectServicesDropDownListData = useMemo(selectServicesForDropDownListData, []);
  const dataForDropdownList = useSelector(selectServicesDropDownListData);
  const memoMultiSelectData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const multiSelectValue = memoMultiSelectData.filter((item) => LookupMultiBP01offeringsId.results.find((ID) => ID === item.value));

  const onMultiSelectValueChange = useCallback(
    (evt: MultiSelectChangeEvent) => onChange({ value: { results: evt.target.value.map(({ value }) => value) } }),
    [onChange]
  );

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <MultiSelect
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        valid={valid}
        id={id}
        value={multiSelectValue}
        data={memoMultiSelectData}
        disabled={disabled}
        textField="text"
        onChange={onMultiSelectValueChange}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
});

export const StaffFormDropDownList: FC<CustomFieldRenderProps> = memo((props) => {
  const { showValidationMessage, hintId, errorId, labelId } = getFormInputOptionalProps(props);
  const { validationMessage, touched, label, id, valid, disabled, hint, value, onChange, ...others } = props;
  const LookupEntityId = value as number;

  const selectStaffDropDownListData = useMemo(selectStaffForDropDownListData, []);
  const dataForDropdownList = useSelector(selectStaffDropDownListData);
  const memoDropDownListData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const selectStaffLastName = useMemo(() => selectStaffLastNameByID(LookupEntityId), [LookupEntityId]);
  const staffLastName = useSelector(selectStaffLastName);
  const dropDownListValue = { text: staffLastName, value };

  const onDropDownListValueChange = useCallback((evt: DropDownListChangeEvent) => onChange({ value: evt.value.value }), [onChange]);

  return (
    <FieldWrapper>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <div className={'k-form-field-wrap'}>
        <DropDownList
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          valid={valid}
          id={id}
          value={dropDownListValue}
          data={memoDropDownListData}
          onChange={onDropDownListValueChange}
          disabled={disabled}
          textField="text"
          {...others}
        />
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
  );
});

export const CustomersFormComboBox: FC<CustomFieldRenderProps> = memo((props) => {
  const { showValidationMessage, hintId, errorId, labelId } = getFormInputOptionalProps(props);
  const { validationMessage, touched, label, id, valid, disabled, hint, value, onChange, isNewCustomer, ...others } = props;
  const LookupEntityId = value as number;

  const [filter, setFilter] = useState('');
  const selectCustomerDropDownListData = useMemo(selectCustomersForDropDownListData, []);
  const dataForComboBox = useSelector(selectCustomerDropDownListData);
  const memoComboBoxData = useMemo(() => dataForComboBox, [dataForComboBox]);
  const filteredDataForComboBox = !filter
    ? memoComboBoxData
    : memoComboBoxData.filter(({ text }) => text.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);

  const selectCustomerFullName = useMemo(() => selectCustomerFullNameByID(LookupEntityId), [LookupEntityId]);
  const customerFullName = useSelector(selectCustomerFullName);
  const comboBoxValue = { text: customerFullName, value };
  // const customerById = useSelector(selectCustomersById());
  console.log(comboBoxValue);

  const onComboBoxValueChange = useCallback(
    (evt: ComboBoxChangeEvent) => {
      const evtValue = evt.value ? evt.value : EmptyDropDownListDataItem;
      // setCustomerField(customerById[evtValue.value]);

      onChange({ value: evtValue.value });
    },
    [onChange]
  );

  const onFilterChange = (evt: ComboBoxFilterChangeEvent) => setFilter(evt.filter.value);

  return (
    <FieldWrapper>
      <Label id={labelId} editorId={id} editorValid={valid || isNewCustomer} editorDisabled={disabled}>
        {label}
      </Label>
      <div className={'k-form-field-wrap'}>
        <ComboBox
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          valid={valid || isNewCustomer}
          id={id}
          value={comboBoxValue}
          data={filteredDataForComboBox}
          onChange={onComboBoxValueChange}
          onFilterChange={onFilterChange}
          filterable
          disabled={disabled}
          textField="text"
          dataItemKey="value"
          {...others}
        />
        {showValidationMessage && !isNewCustomer && <Error id={errorId}>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
  );
});

export const IsNewCustomerFormCheckbox: FC<FieldRenderProps> = memo((props) => {
  const { validationMessage, touched, id, label, valid, disabled, hint, visited, modified, onChange, resetCustomerId, ...others } = props;
  const { showValidationMessage, showHint, hintId, errorId } = getFormInputOptionalProps(props);

  const onCheckboxValueChange = useCallback(
    (evt: CheckboxChangeEvent) => {
      resetCustomerId();

      onChange(evt);
    },
    [onChange, resetCustomerId]
  );

  return (
    <FieldWrapper>
      <Checkbox ariaDescribedBy={`${hintId} ${errorId}`} label={label} id={id} onChange={onCheckboxValueChange} disabled={disabled} {...others} />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
});

export const FormDropDownListWithCustomData: FC<FieldRenderProps> = memo((props) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, value, onChange, data, ...others } = props;
  const { showValidationMessage, hintId, errorId, labelId } = getFormInputOptionalProps(props);
  const dropDownListValue = data.find((item: { text: string; value: typeof value }) => item.value === value);

  const onDropDownListValueChange = useCallback((evt: DropDownListChangeEvent) => onChange({ value: evt.value.value }), [onChange]);

  return (
    <FieldWrapper>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <DropDownList
        value={dropDownListValue}
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        valid={valid}
        id={id}
        textField="text"
        data={data}
        disabled={disabled}
        onChange={onDropDownListValueChange}
        {...others}
      />
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
});

export const WeekdayFormButtonGroup: FC<FieldRenderProps> = memo((props) => {
  const { id, label, valid, disabled, value, onChange } = props;
  const { labelId } = getFormInputOptionalProps(props);
  const btnData = WeekdayButtonGroupData.map((item) => ({ ...item, isSelected: value.includes(item.value) }));

  const onBtnClick = useCallback(
    (clickedBtn: { label: string; isSelected: boolean; value: WeekdayTypesType }) => onChange({ value: [clickedBtn.value] }),
    [onChange]
  );

  return (
    <FieldWrapper>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <ButtonGroup>
        {btnData.map((item) => (
          <Button key={item.label} type="button" togglable={true} selected={item.isSelected} onClick={() => onBtnClick(item)}>
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </FieldWrapper>
  );
});
