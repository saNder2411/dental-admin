import React, { useState, useRef } from 'react';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Input, MaskedTextBox, TextArea, NumericTextBox, RadioGroup } from '@progress/kendo-react-inputs';
import { ComboBox, DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { FieldRenderProps } from '@progress/kendo-react-form';
// Helpers
import { getFormInputOptionalProps } from '../SchedulerHelpers';

export const FormInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, type, optional, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>
        {label}
      </Label>
      <div className={'k-form-field-wrap'}>
        <Input valid={valid} type={type} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
  );
};

export const FormComboBox = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, value, data, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(fieldRenderProps);
  console.log(`fieldRenderPropsFormComboBox`, fieldRenderProps);

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <ComboBox
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        valid={valid}
        id={id}
        disabled={disabled}
        value={value ? value : data[0]}
        data={data}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormDropDownList = (fieldRenderProps: FieldRenderProps) => {
  const editorRef = React.useRef(null);
  const { validationMessage, touched, label, id, valid, disabled, hint, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper>
      {label && (
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
      )}
      <DropDownList
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        ref={editorRef}
        valid={valid}
        id={id}
        disabled={disabled}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormMultiSelect = (fieldRenderProps: FieldRenderProps) => {
  const editorRef = React.useRef(null);
  const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, value, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(fieldRenderProps);
  const multiSelectValue = Array.isArray(value) ? value : [...value.split(`, `)];

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <MultiSelect
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        ref={editorRef}
        valid={valid}
        id={id}
        value={multiSelectValue}
        disabled={disabled}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormMaskedTextBox = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, hint, optional, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} optional={optional}>
        {label}
      </Label>
      <div className={'k-form-field-wrap'}>
        <MaskedTextBox ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
  );
};

export const FormDateTimePicker = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <DateTimePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormTextArea = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, hint, disabled, optional, value, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} optional={optional}>
        {label}
      </Label>
      <TextArea
        valid={valid}
        id={id}
        value={value ? value : ''}
        disabled={disabled}
        ariaDescribedBy={`${hintId} ${errorId}`}
        {...{ ...others, visited: `${others.visited}`, modified: `${`${others.modified}`}` }}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormNumericTextBox = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, secondLabel, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper>
      {label && (
        <Label editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
      )}
      <NumericTextBox ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
      <span style={{ margin: 'auto 0' }}>&nbsp;{secondLabel}</span>
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormRadioGroup = (fieldRenderProps: FieldRenderProps) => {
  const editorRef = useRef(null);
  const { validationMessage, touched, id, label, valid, disabled, hint, visited, modified, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper>
      <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <RadioGroup ref={editorRef} ariaDescribedBy={`${hintId} ${errorId}`} ariaLabelledBy={labelId} valid={valid} disabled={disabled} {...others} />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormButtonGroup = (fieldRenderProps: FieldRenderProps) => {
  const { id, label, valid, disabled, data } = fieldRenderProps;
  const { labelId } = getFormInputOptionalProps(fieldRenderProps);
  const [btnData, setBtnData] = useState<{ name: string; isSelected: boolean }[]>(data);

  const onBtnClick = ({ name, isSelected }: { name: string; isSelected: boolean }) => {
    const updatedBtnData = btnData.map((btn) => (btn.name === name ? { name, isSelected: !isSelected } : btn));
    setBtnData(updatedBtnData);
  };

  return (
    <FieldWrapper>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <ButtonGroup>
        {btnData.map(({ name, isSelected }) => (
          <Button key={Math.random()} togglable={true} selected={isSelected} onClick={() => onBtnClick({ name, isSelected })}>
            {name}
          </Button>
        ))}
      </ButtonGroup>
    </FieldWrapper>
  );
};
