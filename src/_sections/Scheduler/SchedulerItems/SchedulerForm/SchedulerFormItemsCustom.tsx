import React, { FC, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FieldWrapper } from '@progress/kendo-react-form';
import { DropDownList, MultiSelect, MultiSelectChangeEvent, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { FieldRenderProps } from '@progress/kendo-react-form';
// Types
import { LookupEntity } from '../../../../Agenda/AgendaTypes';
import { CustomFieldRenderProps } from '../SchedulerItemTypes';
import { WeekdayTypesType } from './SchedulerFormTypes';
// Selectors
import { selectServicesMemoData } from '../../../../Services/ServicesSelectors';
// Helpers
import { getFormInputOptionalProps } from '../../SchedulerHelpers';
import { transformDomainDataToDropDownListData, transformDomainDataToMultiSelectData } from '../../../Grid/GridItems/GridItemsHelpers';
// Instruments
import { WeekdayButtonGroupData } from './SchedulerFormInstruments';

export const ServicesFormMultiSelect: FC<FieldRenderProps> = (props) => {
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
};

export const LookupEntityFormDropDownList: FC<CustomFieldRenderProps> = (props) => {
  const { showValidationMessage, hintId, errorId, labelId } = getFormInputOptionalProps(props);
  const { validationMessage, touched, label, id, valid, disabled, hint, value, domainData, onChange, setCustomerField, ...others } = props;
  const LookupEntity = value as LookupEntity;

  const currentEntity = domainData.find(({ Id }) => Id === LookupEntity.Id);
  const isTeamStaffDataItem = 'ShowOnline' in (currentEntity ? currentEntity : {});
  const dataForDropDownList = transformDomainDataToDropDownListData(domainData);
  const dropDownListValue =
    dataForDropDownList.find((item) => item.text === (isTeamStaffDataItem ? currentEntity?.Title : currentEntity?.FullName)) ??
    dataForDropDownList[0];

  const onDropDownListValueChange = useCallback(
    (evt: DropDownListChangeEvent) => {
      if (!isTeamStaffDataItem) {
        setCustomerField(domainData.find(({ Id }) => Id === evt.value.value.Id));
      }
      onChange({ value: evt.value.value });
    },
    [domainData, isTeamStaffDataItem, onChange, setCustomerField]
  );

  return (
    <FieldWrapper>
      {label && (
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
      )}
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
    </FieldWrapper>
  );
};

export const FormDropDownListWithCustomData: FC<FieldRenderProps> = (props) => {
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
};

export const WeekdayFormButtonGroup = (props: FieldRenderProps) => {
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
};