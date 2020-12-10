import React, { FC, useMemo, useState, useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
// Styled Components
import * as SC from '../../SchedulerItemsStyled/SchedulerFormStyled';
// Components
import { Loader } from '../../../../_components';
// Form Inputs
import {
  ServicesFormMultiSelect,
  LookupEntityFormDropDownList,
  RepeatFormDropDownList,
  FormInput,
  FormRadioGroup,
  FormMaskedTextBox,
  FormDateTimePicker,
  FormTextArea,
  FormNumericTextBox,
  FormButtonGroup,
  FormDropDownList,
} from './SchedulerFormItems';
// Selectors
import { selectTeamStaffMemoData } from '../../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersMemoData } from '../../../../Customers/CustomersSelectors';
// Types
import { AgendaDataItem, StatusNames } from '../../../../Agenda/AgendaTypes';
import { CustomSchedulerFormProps } from '../SchedulerItemTypes';
import { InitialFormValue } from './SchedulerFormTypes';
// Actions
import { AgendaActions } from '../../../../Agenda/AgendaActions';
import { SchedulerActions } from '../../SchedulerActions';
import { CustomersDataItem } from '../../../../Customers';
// Instruments
import { RepeatTypes, EndRepeatRadioGroupData, EndRepeatTypes } from './SchedulerFormInstruments';
// Helpers
import { getDataItemForApi } from './SchedulerFormHelpers';

const StatusList = Object.values(StatusNames);

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

  const initialValue: InitialFormValue = {
    ...dataItem,
    FirstName,
    LastNameAppt: Title,
    Email: Email ?? '',
    Gender,
    CellPhone: CellPhone ?? '',
    Notes: dataItem.Notes ?? '',
    Repeat: null,
    RepeatInterval: 1,
    EndRepeat: EndRepeatTypes.After,
    EndCount: 1,
    EndUntil: new Date(),
  };

  useEffect(
    () => () => {
      setIsDataItemLoading(false);
      onSubmit({ value: -1 });
    },
    [onSubmit]
  );

  const onFormSubmit = (formDataItem: InitialFormValue, evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newDataItem: AgendaDataItem = getDataItemForApi(formDataItem);
    console.log(`onSubmitDataItem`, newDataItem);

    // console.log(`evt`, evt);
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
            const repeatValue = formRenderProps.valueGetter('Repeat');
            const endRepeatValue = formRenderProps.valueGetter('EndRepeat');
            const isStatusConsultation = formRenderProps.valueGetter('AppointmentStatus') === StatusNames.Consultation;
            let secondLabelForRepeatEvery: string;
            switch (repeatValue) {
              case RepeatTypes.Daily:
                secondLabelForRepeatEvery = 'day(s)';
                break;
              case RepeatTypes.Weekly:
                secondLabelForRepeatEvery = 'week(s)';
                break;
              case RepeatTypes.Monthly:
                secondLabelForRepeatEvery = 'month(s)';
                break;
              case RepeatTypes.Yearly:
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
                    data={StatusList}
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

                  <Field id="repeat" name="Repeat" label="Repeat" component={RepeatFormDropDownList} disabled={isDataItemLoading} />

                  {repeatValue && (
                    <>
                      <Field
                        id="repeatEvery"
                        name="RepeatInterval"
                        label="Repeat every"
                        format="n0"
                        min={1}
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

                  {repeatValue && (
                    <div className="row m-0">
                      <div className="col-md-4 p-0">
                        <Field
                          id="endRepeat"
                          name="EndRepeat"
                          label="End"
                          component={FormRadioGroup}
                          data={EndRepeatRadioGroupData}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="col-md-6 p-0 pt-5 align-self-end">
                        <Field
                          id="endCount"
                          name="EndCount"
                          format="n0"
                          min={1}
                          defaultValue={1}
                          disabled={endRepeatValue !== EndRepeatTypes.After || isDataItemLoading}
                          secondLabel="occurrence(s)"
                          component={FormNumericTextBox}
                        />
                        <Field
                          id="endUntil"
                          name="EndUntil"
                          disabled={endRepeatValue !== EndRepeatTypes.On || isDataItemLoading}
                          component={FormDateTimePicker}
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
                        component={FormInput}
                        validator={requiredValidator}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="lastName"
                        name="LastNameAppt"
                        label="Last Name"
                        component={FormInput}
                        validator={requiredValidator}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="gender"
                        name="Gender"
                        label="Gender"
                        layout="horizontal"
                        component={FormRadioGroup}
                        data={genders}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="email"
                        name="Email"
                        label="Email"
                        type="email"
                        component={FormInput}
                        validator={emailValidator}
                        disabled={isDataItemLoading}
                      />

                      <Field
                        id="phone"
                        name="CellPhone"
                        label="Mobile Phone"
                        mask="+(000) 000-00-00"
                        component={FormMaskedTextBox}
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
