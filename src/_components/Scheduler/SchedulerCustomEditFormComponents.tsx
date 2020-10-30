import React, { useState } from 'react';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Input, MaskedTextBox, TextArea } from '@progress/kendo-react-inputs';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { FieldRenderProps } from '@progress/kendo-react-form';
// Helpers
import { getFormInputOptionalProps } from './SchedulerHelpers';

const repeatRanges = [
  { name: 'Never', data: [] },
  { name: 'Daily', data: [] },
  { name: 'Weekly', data: [] },
  { name: 'Monthly', data: [] },
  { name: 'Yearly', data: [] },
];

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
  const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId, labelId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
        {label}
      </Label>
      <ComboBox ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
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
  const { validationMessage, touched, label, id, valid, hint, disabled, optional, ...others } = fieldRenderProps;
  const { showValidationMessage, showHint, hintId, errorId } = getFormInputOptionalProps(fieldRenderProps);

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} optional={optional}>
        {label}
      </Label>
      <TextArea
        valid={valid}
        id={id}
        disabled={disabled}
        ariaDescribedBy={`${hintId} ${errorId}`}
        {...{ ...others, visited: `${others.visited}`, modified: `${`${others.modified}`}` }}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormChipList = (fieldRenderProps: FieldRenderProps) => {
  const { label, id, valid, optional } = fieldRenderProps;
  const [range, setRange] = useState(repeatRanges[0]);

  const onChipClick = (name: string) => {
    const range = repeatRanges.find((range) => range.name === name);
    setRange(range ? range : repeatRanges[0]);
  };

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} optional={optional}>
        {label}
      </Label>
      <ButtonGroup className="meals">
        {repeatRanges.map(({ name }) => (
          <div>
            <Button togglable={true} selected={range.name === name} onClick={() => onChipClick(name)}>
              {name}
            </Button>
          </div>
        ))}
      </ButtonGroup>
    </FieldWrapper>
  );
};
