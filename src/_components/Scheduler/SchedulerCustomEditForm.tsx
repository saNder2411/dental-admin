import React, { FC } from 'react';
import { SchedulerFormProps } from '@progress/kendo-react-scheduler';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
// Styled Components
import * as SC from './SchedulerCustomEditFormStyled';
// Form Inputs
import {
  FormInput,
  FormComboBox,
  FormMaskedTextBox,
  FormDateTimePicker,
  FormTextArea,
  FormNumericTextBox,
  FormRadioGroup,
  FormButtonGroup,
  FormDropDownList,
} from './SchedulerCustomEditFormComponents';
// Mock
import { CustomersGridData } from '../../Customers/CustomersMockData';
import { employees, OrderStatus } from '../../Calendar/CalendarMockData';

const customers = CustomersGridData.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
const stuffs = employees.map(({ fullName }) => fullName);
const statusList = Object.values(OrderStatus);

const recurrenceNames = ['Never', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
const endRecurrenceDailyData = [
  { label: 'Never', value: 'never' },
  { label: 'After', value: 'after' },
  { label: 'On', value: 'on' },
];

const recurrenceWeeklyData = [
  { name: 'Sun', isSelected: false },
  { name: 'Mon', isSelected: false },
  { name: 'Tue', isSelected: true },
  { name: 'Wed', isSelected: false },
  { name: 'Thu', isSelected: false },
  { name: 'Fri', isSelected: false },
  { name: 'Sat', isSelected: false },
];

const repeatOnMonthlyData = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
];

const weekNumbers = ['First', 'Second', 'Third', 'Fourth', 'Last'];
const monthlyDayNames = ['Day', 'Weekday', 'Weekend Day', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const repeatOnYearlyData = [
  { label: '', value: 'month' },
  { label: '', value: 'week' },
];

const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const SchedulerCustomEditForm: FC<SchedulerFormProps> = ({ dataItem, onSubmit, onCancel, onClose }): JSX.Element => {
  console.log(`formState`, dataItem);

  return (
    <Dialog title={'Event'} onClose={() => onClose && onClose({ value: dataItem })} minWidth={700}>
      <SC.SchedulerCustomEditForm>
        <Form
          initialValues={dataItem}
          onSubmit={(dataItem) => onSubmit({ value: dataItem } as any)}
          render={(formRenderProps) => {
            const repeatValue = formRenderProps.valueGetter('repeat');
            let secondLabelForRepeatEvery: string;
            switch (repeatValue) {
              case 'Daily':
                secondLabelForRepeatEvery = 'day(s)';
                break;
              case 'Weekly':
                secondLabelForRepeatEvery = 'week(s)';
                break;
              case 'Monthly':
                secondLabelForRepeatEvery = 'month(s)';
                break;
              case 'Yearly':
                secondLabelForRepeatEvery = 'year(s)';
                break;
              default:
                secondLabelForRepeatEvery = '';
            }
            console.log(`formRenderProps`, formRenderProps);
            console.log(formRenderProps.valueGetter('repeatOnMonthly'));
            return (
              <FormElement horizontal={true}>
                <fieldset className="k-form-fieldset">
                  <Field
                    id={'customer'}
                    name={'customer'}
                    label={'Customer'}
                    data={customers}
                    component={FormComboBox}
                    validator={requiredValidator}
                  />
                  <Field id={'firstName'} name={'firstName'} label={'First Name'} component={FormInput} validator={requiredValidator} />
                  <Field id={'lastName'} name={'lastName'} label={'Last Name'} component={FormInput} validator={requiredValidator} />
                  <Field
                    id={'mobilePhone'}
                    name={'mobilePhone'}
                    label={'Mobile Phone'}
                    mask={'+1(999) 000-00-00-00'}
                    component={FormMaskedTextBox}
                    validator={phoneValidator}
                  />
                  <Field id={'email'} name={'email'} label={'Email'} type={'email'} component={FormInput} validator={emailValidator} />
                  <Field id={'staff'} name={'staff'} label={'Support Stuff'} data={stuffs} component={FormComboBox} validator={requiredValidator} />
                  <Field id={'start'} name={'start'} label={'Start'} component={FormDateTimePicker} validator={requiredValidator} />
                  <Field id={'end'} name={'end'} label={'End'} component={FormDateTimePicker} validator={requiredValidator} />
                  <Field id={'refID'} name={'refID'} label={'Services'} component={FormInput} validator={requiredValidator} />
                  <Field id={'status'} name={'status'} label={'Status'} data={statusList} component={FormComboBox} validator={requiredValidator} />
                  <Field id={'repeat'} name={'repeat'} label={'Repeat'} data={recurrenceNames} component={FormDropDownList} />

                  {repeatValue !== 'Never' && (
                    <>
                      <Field
                        id={'repeatEvery'}
                        name={'repeatEvery'}
                        label={'Repeat every'}
                        format={'n0'}
                        min={1}
                        defaultValue={1}
                        secondLabel={secondLabelForRepeatEvery}
                        component={FormNumericTextBox}
                      />
                    </>
                  )}

                  {repeatValue === 'Weekly' && (
                    <Field
                      id={'repeatOnWeekday'}
                      name={'repeatOnWeekday'}
                      label={'Repeat on'}
                      data={recurrenceWeeklyData}
                      component={FormButtonGroup}
                    />
                  )}

                  {repeatValue === 'Monthly' && (
                    <div className="row m-0">
                      <div className="col-md-4 p-0">
                        <Field
                          id={'repeatOnMonthly'}
                          name={'repeatOnMonthly'}
                          label={'Repeat on'}
                          defaultValue={'day'}
                          data={repeatOnMonthlyData}
                          component={FormRadioGroup}
                        />
                      </div>
                      <div className="col-md-6 monthly-group">
                        <Field
                          id={'repeatOnMonthlyDay'}
                          name={'repeatOnMonthlyDay'}
                          format={'n0'}
                          min={1}
                          max={31}
                          defaultValue={1}
                          disabled={formRenderProps.valueGetter('repeatOnMonthly') === 'week'}
                          component={FormNumericTextBox}
                        />
                        <div className="row m-0 pt-1">
                          <div className="col-md-4 p-0">
                            <Field
                              id={'monthlyWeekNumber'}
                              name={'monthlyWeekNumber'}
                              component={FormDropDownList}
                              data={weekNumbers}
                              defaultValue={weekNumbers[0]}
                              disabled={formRenderProps.valueGetter('repeatOnMonthly') !== 'week'}
                            />
                          </div>
                          <div className="col-md-6 p-0">
                            <Field
                              id={'monthlyWeekday'}
                              name={'monthlyWeekday'}
                              component={FormDropDownList}
                              data={monthlyDayNames}
                              defaultValue={monthlyDayNames[3]}
                              disabled={formRenderProps.valueGetter('repeatOnMonthly') !== 'week'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {repeatValue === 'Yearly' && (
                    <div className="row m-0">
                      <div className="col-md-3 p-0">
                        <Field
                          id={'repeatOnYearly'}
                          name={'repeatOnYearly'}
                          label={'Repeat on'}
                          defaultValue={'month'}
                          data={repeatOnYearlyData}
                          component={FormRadioGroup}
                        />
                      </div>
                      <div className="col-md-6 yearly-group">
                        <div className="row m-0 pt-1">
                          <div className="col-md-6 p-0">
                            <Field
                              id={'monthNames'}
                              name={'monthNames'}
                              data={monthName}
                              defaultValue={monthName[0]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') === 'week'}
                              component={FormDropDownList}
                            />
                          </div>
                          <div className="col-md-4 p-0">
                            <Field
                              id={'repeatOnYearlyDay'}
                              name={'repeatOnYearlyDay'}
                              format={'n0'}
                              min={1}
                              max={31}
                              defaultValue={1}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') === 'week'}
                              component={FormNumericTextBox}
                            />
                          </div>
                        </div>
                        <div className="row pt-1  yearly-group yearly-group-dropdown">
                          <div className="col-md-3 p-0 pr-1">
                            <Field
                              id={'yearlyWeekNumber'}
                              name={'yearlyWeekNumber'}
                              component={FormDropDownList}
                              data={weekNumbers}
                              defaultValue={weekNumbers[0]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') !== 'week'}
                            />
                          </div>
                          <div className="col-md-4 p-0">
                            <Field
                              id={'yearlyWeekday'}
                              name={'yearlyWeekday'}
                              data={monthlyDayNames}
                              defaultValue={monthlyDayNames[3]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') !== 'week'}
                              component={FormDropDownList}
                            />
                          </div>
                          <div className="col-md-1 p-1">
                            of
                          </div>
                          <div className="col-md-4 p-0">
                            <Field
                              id={'monthNamess'}
                              name={'monthNames'}
                              data={monthName}
                              defaultValue={monthName[0]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') !== 'week'}
                              component={FormDropDownList}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {repeatValue !== 'Never' && (
                    <div className="row m-0">
                      <div className="col-md-4 p-0">
                        <Field
                          id={'endRecurrenceDaily'}
                          name={'endRecurrenceDaily'}
                          label={'End'}
                          defaultValue={'never'}
                          component={FormRadioGroup}
                          data={endRecurrenceDailyData}
                        />
                      </div>
                      <div className="col-md-6 p-0 pt-5 align-self-end">
                        <Field
                          id={'endAfterRepeatDayCount'}
                          name={'endAfterRepeatDayCount'}
                          format={'n0'}
                          min={1}
                          defaultValue={1}
                          disabled={formRenderProps.valueGetter('endRecurrenceDaily') !== 'after'}
                          secondLabel={'occurrence(s)'}
                          component={FormNumericTextBox}
                        />
                        <Field
                          id={'endOn'}
                          name={'start'}
                          disabled={formRenderProps.valueGetter('endRecurrenceDaily') !== 'on'}
                          component={FormDateTimePicker}
                          validator={requiredValidator}
                        />
                      </div>
                    </div>
                  )}

                  <Field id={'notes'} name={'notes'} label={'Notes'} component={FormTextArea} />

                  <div className="form__actions-bar-wrapper">
                    <DialogActionsBar>
                      <button className="k-button" type="submit" disabled={!formRenderProps.allowSubmit}>
                        Save
                      </button>
                      <button className="k-button" onClick={() => onCancel && onCancel({ value: dataItem })}>
                        Cancel
                      </button>
                    </DialogActionsBar>
                  </div>
                </fieldset>
              </FormElement>
            );
          }}
        />
      </SC.SchedulerCustomEditForm>
    </Dialog>
  );
};

const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const requiredValidator = (value: string) => (value ? '' : 'Error: This field is required.');
export const phoneValidator = (value: string) => (!value ? 'Phone number is required.' : phoneRegex.test(value) ? '' : 'Not a valid phone number.');
export const emailValidator = (value: string) => (!value ? 'Email field is required.' : emailRegex.test(value) ? '' : 'Email is not valid format.');
