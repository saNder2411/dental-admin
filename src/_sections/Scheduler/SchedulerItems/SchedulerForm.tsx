import React, { FC, useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
// Styled Components
import * as SC from './SchedulerItemStyled/SchedulerFormStyled';
// Components
import { Loader } from '../../../_components';
// Form Inputs
import {
  ServicesFormMultiSelect,
  LookupEntityFormDropDownList,
  CustomerFormInput,
  CustomerFormRadioGroup,
  FormRadioGroup,
  CustomerFormMaskedTextBox,
  FormDateTimePicker,
  FormTextArea,
  FormNumericTextBox,
  FormButtonGroup,
  FormDropDownList,
} from './SchedulerFormItems';
// Selectors
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersMemoData } from '../../../Customers/CustomersSelectors';
// Types
import { AgendaDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
import { CustomSchedulerFormProps } from './SchedulerItemTypes';
// Actions
import { AgendaActions } from '../../../Agenda/AgendaActions';
import { SchedulerActions } from '../SchedulerActions';
import { CustomersDataItem } from '../../../Customers';

const statusList = Object.values(StatusNames);

const recurrenceNames = ['Never', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
const endRecurrenceData = [
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

const genders = [
  { label: 'Male', value: '(2) Male' },
  { label: 'Female', value: '(1) Female' },
];

export const SchedulerForm: FC<CustomSchedulerFormProps> = ({ dataItem, onSubmit, onCancel, onClose }): JSX.Element => {
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();

  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const selectCustomersData = useMemo(selectCustomersMemoData, []);
  const customersData = useSelector(selectCustomersData);

  const { FirstName, Title, Email, Gender, CellPhone } = useMemo(
    () => customersData.find(({ Id }) => Id === dataItem.LookupCM102customers.Id) ?? customersData[0],
    [customersData, dataItem.LookupCM102customers.Id]
  );
  const initialValue: AgendaDataItem = {
    ...dataItem,
    FirstName,
    LastNameAppt: Title,
    Email: Email ?? '',
    Gender,
    CellPhone: CellPhone ?? '',
    Notes: dataItem.Notes ?? '',
  };

  useEffect(
    () => () => {
      setIsDataItemLoading(false);
      onSubmit({ value: -1 });
    },
    [onSubmit]
  );

  const onFormSubmit = ({ FirstName, LastNameAppt, ...others }: AgendaDataItem) => {
    const newDataItem: AgendaDataItem = { ...others, FirstName, LastNameAppt, Title: `${FirstName[0]}.${LastNameAppt}-0000` };
    console.log(`onSubmitDataItem`, newDataItem);
    setIsDataItemLoading(true);
    dataItem.isNew ? AgendaActions.createDataItem(dispatch, newDataItem, () => {}) : AgendaActions.updateDataItem(dispatch, newDataItem, () => {});
  };

  const onDialogClose = (onDiscardAction: undefined | ((arg: { value: null }) => void)) => {
    if (dataItem.isNew) {
      SchedulerActions.onDiscardNewItemToData(dispatch, dataItem);
    }

    onDiscardAction && onDiscardAction({ value: null });
  };

  return (
    <Dialog title="Event" onClose={() => !isDataItemLoading && onDialogClose(onClose)} minWidth={700} height="73%">
      <SC.SchedulerForm>
        <Form
          initialValues={initialValue}
          onSubmit={onFormSubmit as any}
          render={(formRenderProps) => {
            console.log(`formRenderProps`, formRenderProps);
            const repeatValue = formRenderProps.valueGetter('repeat') ?? 'Never';
            const isStatusConsultation = formRenderProps.valueGetter('AppointmentStatus') === StatusNames.Consultation;
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

            const setCustomerField = (dataItem: CustomersDataItem | undefined) => {
              formRenderProps.onChange(`FirstName`, { value: dataItem?.FirstName });
              formRenderProps.onChange(`LastNameAppt`, { value: dataItem?.Title });
              formRenderProps.onChange(`Email`, { value: dataItem?.Email ?? '' });
              formRenderProps.onChange(`Gender`, { value: dataItem?.Gender ?? '(1) Female' });
              formRenderProps.onChange(`CellPhone`, { value: dataItem?.CellPhone ?? '' });
            };

            return (
              <FormElement horizontal={true}>
                <fieldset className="k-form-fieldset">
                  <Field
                    id="services"
                    name="LookupMultiBP01offerings"
                    label="Services"
                    component={ServicesFormMultiSelect}
                    disabled={isDataItemLoading}
                  />

                  <Field
                    id="status"
                    name="AppointmentStatus"
                    label="Status"
                    data={statusList}
                    component={FormDropDownList}
                    disabled={isDataItemLoading}
                  />

                  <Field
                    id="start"
                    name="Start"
                    label="Start"
                    component={FormDateTimePicker}
                    validator={requiredValidator}
                    disabled={isDataItemLoading}
                  />

                  <Field id="end" name="End" label="End" component={FormDateTimePicker} validator={requiredValidator} disabled={isDataItemLoading} />

                  <Field
                    id="repeat"
                    name="repeat"
                    label="Repeat"
                    defaultValue="Never"
                    data={recurrenceNames}
                    component={FormDropDownList}
                    disabled={isDataItemLoading}
                  />

                  {repeatValue !== 'Never' && (
                    <>
                      <Field
                        id="repeatEvery"
                        name="repeatEvery"
                        label="Repeat every"
                        format="n0"
                        min={1}
                        defaultValue={1}
                        secondLabel={secondLabelForRepeatEvery}
                        component={FormNumericTextBox}
                        disabled={isDataItemLoading}
                      />
                    </>
                  )}

                  {repeatValue === 'Weekly' && (
                    <Field
                      id="repeatOnWeekday"
                      name="repeatOnWeekday"
                      label="Repeat on"
                      data={recurrenceWeeklyData}
                      component={FormButtonGroup}
                      disabled={isDataItemLoading}
                    />
                  )}

                  {repeatValue === 'Monthly' && (
                    <div className="row m-0">
                      <div className="col-md-4 p-0">
                        <Field
                          id="repeatOnMonthly"
                          name="repeatOnMonthly"
                          label="Repeat on"
                          defaultValue="day"
                          data={repeatOnMonthlyData}
                          component={FormRadioGroup}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="col-md-6 monthly-group">
                        <Field
                          id="repeatOnMonthlyDay"
                          name="repeatOnMonthlyDay"
                          format="n0"
                          min={1}
                          max={31}
                          defaultValue={1}
                          disabled={formRenderProps.valueGetter('repeatOnMonthly') === 'week' || isDataItemLoading}
                          component={FormNumericTextBox}
                        />
                        <div className="row m-0 pt-1">
                          <div className="col-md-4 p-0">
                            <Field
                              id="monthlyWeekNumber"
                              name="monthlyWeekNumber"
                              component={FormDropDownList}
                              data={weekNumbers}
                              defaultValue={weekNumbers[0]}
                              disabled={formRenderProps.valueGetter('repeatOnMonthly') !== 'week' || isDataItemLoading}
                            />
                          </div>
                          <div className="col-md-6 p-0">
                            <Field
                              id="monthlyWeekday"
                              name="monthlyWeekday"
                              component={FormDropDownList}
                              data={monthlyDayNames}
                              defaultValue={monthlyDayNames[3]}
                              disabled={formRenderProps.valueGetter('repeatOnMonthly') !== 'week' || isDataItemLoading}
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
                          id="repeatOnYearly"
                          name="repeatOnYearly"
                          label="Repeat on"
                          defaultValue="month"
                          data={repeatOnYearlyData}
                          component={FormRadioGroup}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="col-md-6 yearly-group">
                        <div className="row m-0 pt-1">
                          <div className="col-md-6 p-0">
                            <Field
                              id="monthNames"
                              name="monthNames"
                              data={monthName}
                              defaultValue={monthName[0]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') === 'week' || isDataItemLoading}
                              component={FormDropDownList}
                            />
                          </div>
                          <div className="col-md-4 p-0">
                            <Field
                              id="repeatOnYearlyDay"
                              name="repeatOnYearlyDay"
                              format="n0"
                              min={1}
                              max={31}
                              defaultValue={1}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') === 'week' || isDataItemLoading}
                              component={FormNumericTextBox}
                            />
                          </div>
                        </div>
                        <div className="row pt-1  yearly-group yearly-group-dropdown">
                          <div className="col-md-3 p-0 pr-1">
                            <Field
                              id="yearlyWeekNumber"
                              name="yearlyWeekNumber"
                              component={FormDropDownList}
                              data={weekNumbers}
                              defaultValue={weekNumbers[0]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') !== 'week' || isDataItemLoading}
                            />
                          </div>
                          <div className="col-md-4 p-0">
                            <Field
                              id="yearlyWeekday"
                              name="yearlyWeekday"
                              data={monthlyDayNames}
                              defaultValue={monthlyDayNames[3]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') !== 'week' || isDataItemLoading}
                              component={FormDropDownList}
                            />
                          </div>
                          <div className="col-md-1 p-1">of</div>
                          <div className="col-md-4 p-0">
                            <Field
                              id="monthNamess"
                              name="monthNames"
                              data={monthName}
                              defaultValue={monthName[0]}
                              disabled={formRenderProps.valueGetter('repeatOnYearly') !== 'week' || isDataItemLoading}
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
                          id="endRecurrence"
                          name="endRecurrence"
                          label="End"
                          defaultValue="after"
                          component={FormRadioGroup}
                          data={endRecurrenceData}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="col-md-6 p-0 pt-5 align-self-end">
                        <Field
                          id="endAfterRepeatDayCount"
                          name="endAfterRepeatDayCount"
                          format="n0"
                          min={1}
                          defaultValue={1}
                          disabled={
                            formRenderProps.valueGetter('endRecurrence') === 'on' ||
                            formRenderProps.valueGetter('endRecurrence') === 'never' ||
                            isDataItemLoading
                          }
                          secondLabel="occurrence(s)"
                          component={FormNumericTextBox}
                        />
                        <Field
                          id="endOn"
                          name="Start"
                          disabled={formRenderProps.valueGetter('endRecurrence') !== 'on' || isDataItemLoading}
                          component={FormDateTimePicker}
                          validator={requiredValidator}
                        />
                      </div>
                    </div>
                  )}

                  <Field
                    id="staff"
                    name="LookupHR01team"
                    label="Support Stuff"
                    domainData={teamStaffData}
                    component={LookupEntityFormDropDownList}
                    disabled={isDataItemLoading}
                  />

                  {isStatusConsultation ? null : (
                    <>
                      <Field
                        id="customer"
                        name="LookupCM102customers"
                        label="Customer"
                        setCustomerField={setCustomerField}
                        domainData={customersData}
                        component={LookupEntityFormDropDownList}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="firstName"
                        name="FirstName"
                        label="First Name"
                        component={CustomerFormInput}
                        validator={requiredValidator}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="lastName"
                        name="LastNameAppt"
                        label="Last Name"
                        component={CustomerFormInput}
                        validator={requiredValidator}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="gender"
                        name="Gender"
                        label="Gender"
                        layout="horizontal"
                        component={CustomerFormRadioGroup}
                        data={genders}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="email"
                        name="Email"
                        label="Email"
                        type="email"
                        component={CustomerFormInput}
                        validator={emailValidator}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="phone"
                        name="CellPhone"
                        label="Mobile Phone"
                        mask="+(000) 000-00-00"
                        component={CustomerFormMaskedTextBox}
                        validator={phoneValidator}
                        disabled={isDataItemLoading}
                      />
                    </>
                  )}

                  <Field id="notes" name="Notes" label="Notes" component={FormTextArea} disabled={isDataItemLoading} />

                  <div className="form__actions-bar-wrapper">
                    <DialogActionsBar>
                      <button className="k-button" type="submit" disabled={isDataItemLoading}>
                        {isDataItemLoading ? (
                          <Loader
                            className="d-flex justify-content-center align-items-center"
                            type="pulsing"
                            isLoading={isDataItemLoading}
                            themeColor="primary"
                          />
                        ) : (
                          `Save`
                        )}
                      </button>
                      <button className="k-button" onClick={() => onDialogClose(onCancel)} disabled={isDataItemLoading}>
                        Cancel
                      </button>
                    </DialogActionsBar>
                  </div>
                </fieldset>
              </FormElement>
            );
          }}
        />
      </SC.SchedulerForm>
    </Dialog>
  );
};

const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const requiredValidator = (value: string) => (value ? '' : 'Error: This field is required.');
const phoneValidator = (value: string) => (!value ? 'Phone number is required.' : phoneRegex.test(value) ? '' : 'Not a valid phone number.');
const emailValidator = (value: string) => (!value ? 'Email field is required.' : emailRegex.test(value) ? '' : 'Email is not valid format.');
