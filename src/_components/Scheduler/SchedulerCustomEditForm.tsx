import React, { FC } from 'react';
import { SchedulerFormProps } from '@progress/kendo-react-scheduler';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
// Styled Components
import * as SC from './SchedulerCustomEditFormStyled';
// Form Inputs
import { FormInput, FormComboBox, FormMaskedTextBox, FormDateTimePicker, FormTextArea, FormChipList } from './SchedulerCustomEditFormComponents';
// Mock
import { CustomersGridData } from '../../Customers/CustomersMockData';
import { employees, OrderStatus } from '../../Calendar/CalendarMockData';

const customers = CustomersGridData.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
const stuffs = employees.map(({ fullName }) => fullName);
const statusList = Object.values(OrderStatus);

export const SchedulerCustomEditForm: FC<SchedulerFormProps> = ({ dataItem, onSubmit, onCancel, onClose }): JSX.Element => {
  console.log(`formState`, dataItem);

  return (
    <Dialog title={'Event'} onClose={() => onClose && onClose({ value: dataItem })} minWidth={700}>
      <SC.SchedulerCustomEditForm>
        <Form
          initialValues={dataItem}
          onSubmit={(dataItem) => onSubmit({ value: dataItem } as any)}
          render={(formRenderProps) => (
            <FormElement horizontal={true}>
              <fieldset className="k-form-fieldset">
                <Field id={'customer'} name={'customer'} label={'Customer'} data={customers} component={FormComboBox} validator={requiredValidator} />
                <Field id={'firstName'} name={'firstName'} label={'First Name'} component={FormInput} validator={requiredValidator} />
                <Field id={'lastName'} name={'lastName'} label={'Last Name'} component={FormInput} validator={requiredValidator} />
                <Field
                  id={'mobilePhone'}
                  name={'mobilePhone'}
                  label={'Mobile Phone'}
                  hint={'Hint: Customer active phone number.'}
                  mask={'+1(999) 000-00-00-00'}
                  component={FormMaskedTextBox}
                  validator={phoneValidator}
                />
                <Field
                  id={'email'}
                  name={'email'}
                  label={'Email'}
                  hint={'Hint: Enter customer personal email address.'}
                  type={'email'}
                  component={FormInput}
                  validator={emailValidator}
                />
                <Field id={'staff'} name={'staff'} label={'Support Stuff'} data={stuffs} component={FormComboBox} validator={requiredValidator} />
                <Field id={'start'} name={'start'} label={'Start'} component={FormDateTimePicker} validator={requiredValidator} />
                <Field id={'end'} name={'end'} label={'End'} component={FormDateTimePicker} validator={requiredValidator} />
                <Field id={'refID'} name={'refID'} label={'Services'} component={FormInput} validator={requiredValidator} />
                <Field id={'status'} name={'status'} label={'Status'} data={statusList} component={FormComboBox} validator={requiredValidator} />
                <Field id={'repeat'} name={'repeat'} label={'Repeat'} component={FormChipList} />
                <Field id={'notes'} name={'notes'} label={'Notes'} component={FormTextArea} />

                <div className="form__actions-bar-wrapper" style={{ marginTop: '25px' }}>
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
          )}
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
