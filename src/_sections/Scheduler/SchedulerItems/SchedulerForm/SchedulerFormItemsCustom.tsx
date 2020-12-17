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
// Types
import { LookupEntity } from '../../../../Agenda/AgendaTypes';
import { CustomFieldRenderProps } from '../SchedulerItemTypes';
import { WeekdayTypesType } from './SchedulerFormTypes';
// Selectors
import { selectServicesMemoData } from '../../../../Services/ServicesSelectors';
// Helpers
import { getFormInputOptionalProps } from '../../SchedulerHelpers';
import {
  transformDomainDataToDropDownListData,
  transformDomainDataToMultiSelectData,
  EmptyDropDownListDataItem,
} from '../../../Grid/GridItems/GridItemsHelpers';
// Instruments
import { WeekdayButtonGroupData } from './SchedulerFormInstruments';

export const CustomMemoField: FC<FieldProps> = memo((props) => <Field {...props} />);

export const ServicesFormMultiSelect: FC<FieldRenderProps> = memo((props) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, value, onChange, ...others } = props;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(props);
  const LookupMultiBP01offerings = value as { results: LookupEntity[] | [] };

  const selectServicesData = useMemo(selectServicesMemoData, []);
  const servicesData = useSelector(selectServicesData);
  const currentServices = servicesData.filter(({ Id }) => LookupMultiBP01offerings.results.find((item) => item.Id === Id));
  const dataForMultiSelect = transformDomainDataToMultiSelectData(servicesData);
  const multiSelectValue = transformDomainDataToMultiSelectData(currentServices);

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
        data={dataForMultiSelect}
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

export const TeamStaffFormDropDownList: FC<CustomFieldRenderProps> = memo((props) => {
  const { showValidationMessage, hintId, errorId, labelId } = getFormInputOptionalProps(props);
  const { validationMessage, touched, label, id, valid, disabled, hint, value, domainData, onChange, ...others } = props;
  const LookupEntity = value as LookupEntity;

  const currentEmployee = domainData.find(({ Id }) => Id === LookupEntity.Id);
  const dataForDropDownList = transformDomainDataToDropDownListData(domainData);
  const dropDownListValue = dataForDropDownList.find((item) => item.text === currentEmployee?.Title) ?? dataForDropDownList[0];

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
          data={dataForDropDownList}
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
  const { validationMessage, touched, label, id, valid, disabled, hint, value, domainData, onChange, setCustomerField, ...others } = props;
  const LookupEntity = value as LookupEntity;

  const [filter, setFilter] = useState('');
  const currentCustomer = domainData.find(({ Id }) => Id === LookupEntity.Id);
  const dataForComboBox = transformDomainDataToDropDownListData(domainData);
  const filteredDataForComboBox = !filter
    ? dataForComboBox
    : dataForComboBox.filter(({ text }) => text.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);
  const comboBoxValue = filteredDataForComboBox.find((item) => item.text === currentCustomer?.FullName) ?? EmptyDropDownListDataItem;

  const onComboBoxValueChange = useCallback(
    (evt: ComboBoxChangeEvent) => {
      const evtValue = evt.value ? evt.value : EmptyDropDownListDataItem;
      setCustomerField(domainData.find(({ Id }) => Id === evtValue.value.Id));

      onChange({ value: evtValue.value });
    },
    [domainData, onChange, setCustomerField]
  );

  const onFilterChange = (evt: ComboBoxFilterChangeEvent) => setFilter(evt.filter.value);

  return (
    <FieldWrapper>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <div className={'k-form-field-wrap'}>
        <ComboBox
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          valid={valid}
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
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </div>
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
    (clickedBtn: { label: string; isSelected: boolean; value: WeekdayTypesType }) => {
      const updatedBtnData = btnData.map((item) => (item.value === clickedBtn.value ? { ...item, isSelected: !item.isSelected } : item));
      onChange({ value: updatedBtnData.filter(({ isSelected }) => isSelected).map(({ value }) => value) });
    },
    [btnData, onChange]
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
