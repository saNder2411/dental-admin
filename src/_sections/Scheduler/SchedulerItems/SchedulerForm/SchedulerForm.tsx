import React, { FC, useMemo, useState, useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
// Styled Components
import * as SC from '../../SchedulerItemsStyled/SchedulerFormStyled';
// Components
import { Loader } from '../../../../_components';
// Form Items
import {
  ServicesFormMultiSelect,
  LookupEntityFormDropDownList,
  FormDropDownListWithCustomData,
  WeekdayFormButtonGroup,
} from './SchedulerFormItemsCustom';
import {
  FormInput,
  FormRadioGroup,
  FormMaskedTextBox,
  FormDateTimePicker,
  FormTextArea,
  FormNumericTextBox,
  FormDropDownList,
} from './SchedulerFormItems';
// Selectors
import { selectTeamStaffMemoData } from '../../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersMemoData } from '../../../../Customers/CustomersSelectors';
// Types
import { StatusNames } from '../../../../Agenda/AgendaTypes';
import { CustomSchedulerFormProps } from '../SchedulerItemTypes';
import { InitialFormValue } from './SchedulerFormTypes';
// Actions
import { AgendaActions } from '../../../../Agenda/AgendaActions';
import { SchedulerActions } from '../../SchedulerActions';
import { CustomersDataItem } from '../../../../Customers';
// Instruments
import {
  StatusDropDownListData,
  RepeatTypes,
  RepeatDropDownListData,
  EndRepeatRadioGroupData,
  EndRepeatTypes,
  RepeatOnMonthlyRadioGroupData,
  MonthlyTypes,
  WeekNumberDropDownListData,
  MonthlyDayTypeDropDownListData,
  RepeatOnYearlyRadioGroupData,
  YearlyTypes,
  YearlyMonthTypeDropDownListData,
  GendersRadioGroupData,
} from './SchedulerFormInstruments';
// Helpers
import {
  getInitialFormValue,
  getDataItemForApi,
  requiredValidator,
  phoneValidator,
  emailValidator,
  getSecondLabelForRepeatEvery,
} from './SchedulerFormHelpers';

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

  const initialValue = getInitialFormValue(dataItem, { FirstName, Title, Email, Gender, CellPhone });

  useEffect(
    () => () => {
      setIsDataItemLoading(false);
      onSubmit({ value: -1 });
    },
    [onSubmit]
  );

  const onFormSubmit = (formDataItem: InitialFormValue, evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newDataItem = getDataItemForApi(formDataItem);
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
            // console.log(`formRenderProps`, formRenderProps);
            const repeatValue = formRenderProps.valueGetter('Repeat');
            const endRepeatValue = formRenderProps.valueGetter('EndRepeat');
            const repeatOnMonthlyValue = formRenderProps.valueGetter('RepeatOnMonthly');
            const repeatOnYearlyValue = formRenderProps.valueGetter('RepeatOnYearly');
            const isStatusConsultation = formRenderProps.valueGetter('AppointmentStatus') === StatusNames.Consultation;
            const secondLabelForRepeatEvery = getSecondLabelForRepeatEvery(repeatValue);

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
                    data={StatusDropDownListData}
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
                    name="Repeat"
                    label="Repeat"
                    component={FormDropDownListWithCustomData}
                    data={RepeatDropDownListData}
                    disabled={isDataItemLoading}
                  />

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

                  {repeatValue === RepeatTypes.Weekly && (
                    <Field
                      id="RepeatOnWeekday"
                      name="RepeatOnWeekday"
                      label="Repeat on"
                      component={WeekdayFormButtonGroup}
                      disabled={isDataItemLoading}
                    />
                  )}

                  {repeatValue === RepeatTypes.Monthly && (
                    <div className="row m-0">
                      <div className="col-md-4 p-0">
                        <Field
                          id="RepeatOnMonthly"
                          name="RepeatOnMonthly"
                          label="Repeat on"
                          data={RepeatOnMonthlyRadioGroupData}
                          component={FormRadioGroup}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="col-md-6 monthly-group">
                        <Field
                          id="MonthlyDay"
                          name="MonthlyDay"
                          format="n0"
                          min={1}
                          max={31}
                          disabled={repeatOnMonthlyValue === MonthlyTypes.Week || isDataItemLoading}
                          component={FormNumericTextBox}
                        />
                        <div className="row m-0 pt-1">
                          <div className="col-md-4 p-0">
                            <Field
                              id="MonthlyWeekNumber"
                              name="MonthlyWeekNumber"
                              component={FormDropDownListWithCustomData}
                              data={WeekNumberDropDownListData}
                              disabled={repeatOnMonthlyValue === MonthlyTypes.Day || isDataItemLoading}
                            />
                          </div>
                          <div className="col-md-6 p-0">
                            <Field
                              id="MonthlyDayType"
                              name="MonthlyDayType"
                              component={FormDropDownListWithCustomData}
                              data={MonthlyDayTypeDropDownListData}
                              disabled={repeatOnMonthlyValue === MonthlyTypes.Day || isDataItemLoading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {repeatValue === RepeatTypes.Yearly && (
                    <div className="RepeatOnYearly">
                      <div className="yearly-group__label">
                        <Field
                          id="RepeatOnYearly"
                          name="RepeatOnYearly"
                          label="Repeat on"
                          data={RepeatOnYearlyRadioGroupData}
                          component={FormRadioGroup}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="RepeatOnYearly__fields yearly-group">
                        <div className="row m-0">
                          <div className="col-md-4 p-0">
                            <Field
                              id="YearlyMonth"
                              name="YearlyMonth"
                              data={YearlyMonthTypeDropDownListData}
                              disabled={repeatOnYearlyValue === YearlyTypes.Week || isDataItemLoading}
                              component={FormDropDownListWithCustomData}
                            />
                          </div>
                          <div className="col-md-3 p-0">
                            <Field
                              id="YearlyMonthDay"
                              name="YearlyMonthDay"
                              format="n0"
                              min={1}
                              max={31}
                              disabled={repeatOnYearlyValue === YearlyTypes.Week || isDataItemLoading}
                              component={FormNumericTextBox}
                            />
                          </div>
                        </div>
                        <div className="row m-0 pt-1  yearly-group yearly-group-dropdown">
                          <div className="col-md-3 p-0">
                            <Field
                              id="YearlyWeekNumber"
                              name="YearlyWeekNumber"
                              component={FormDropDownListWithCustomData}
                              data={WeekNumberDropDownListData}
                              disabled={repeatOnYearlyValue === YearlyTypes.Day || isDataItemLoading}
                            />
                          </div>
                          <div className="col-md-4 p-0">
                            <Field
                              id="YearlyDayType"
                              name="YearlyDayType"
                              data={MonthlyDayTypeDropDownListData}
                              disabled={repeatOnYearlyValue === YearlyTypes.Day || isDataItemLoading}
                              component={FormDropDownListWithCustomData}
                            />
                          </div>
                          <div className="d-flex align-items-center mr-2">of</div>
                          <div className="col-md-4 p-0">
                            <Field
                              id="yearlyMonth"
                              name="YearlyMonth"
                              data={YearlyMonthTypeDropDownListData}
                              disabled={repeatOnYearlyValue === YearlyTypes.Day || isDataItemLoading}
                              component={FormDropDownListWithCustomData}
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
                        data={GendersRadioGroupData}
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
