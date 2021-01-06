import React, { FC, useMemo, useState, useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, FormElement } from '@progress/kendo-react-form';
// Styled Components
import * as SC from '../../SchedulerItemsStyled/SchedulerFormStyled';
// Components
import { Loader } from '../../../../_components';
// Form Items
import {
  CustomMemoField,
  ServicesFormMultiSelect,
  StaffFormDropDownList,
  CustomersFormComboBox,
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
import { selectCustomerById } from '../../../Grid/GridSelectors';
import { selectMemoUpdatedRecurringDataItem } from '../../SchedulerSelectors';
// Types
import { StatusNames } from '../../../Grid/GridTypes';
import { CustomerDataItem } from '../../../../Customers';
import { CustomSchedulerFormProps } from '../SchedulerItemTypes';
import { InitialFormValue } from './SchedulerFormTypes';
// Actions
import {
  updateAppointmentRecurringDataItemInitAsyncAC,
  updateAppointmentDataItemInitAsyncAC,
  createAppointmentDataItemInitAsyncAC,
} from '../../../Grid/GridAC';
import { SchedulerActions } from '../../SchedulerActions';
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
  requiredDropDownListValidator,
  phoneValidator,
  emailValidator,
  getSecondLabelForRepeatEvery,
} from './SchedulerFormHelpers';

export const SchedulerForm: FC<CustomSchedulerFormProps> = ({ dataItem, onSubmit, onCancel, onClose }): JSX.Element => {
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();

  const selectUpdatedRecurringDataItem = useMemo(selectMemoUpdatedRecurringDataItem, []);
  const updatedRecurringDataItem = useSelector(selectUpdatedRecurringDataItem);

  const selectCustomer = useMemo(() => selectCustomerById(dataItem.LookupCM102customersId), [dataItem.LookupCM102customersId]);
  const { FirstName, Title, Email, Gender, CellPhone } = useSelector(selectCustomer);

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
    // console.log(`onSubmitDataItem`, newDataItem);

    setIsDataItemLoading(true);

    if (updatedRecurringDataItem && dataItem.isNew) {
      dispatch(
        updateAppointmentRecurringDataItemInitAsyncAC(updatedRecurringDataItem, newDataItem, () => {
          SchedulerActions.discardNewItemToData(dispatch);
          SchedulerActions.changeUpdatedRecurringDataItem(dispatch, null);
        })
      );
      return;
    }

    dataItem.isNew
      ? dispatch(
          createAppointmentDataItemInitAsyncAC(
            newDataItem,
            () => {},
            () => SchedulerActions.discardNewItemToData(dispatch)
          )
        )
      : dispatch(updateAppointmentDataItemInitAsyncAC(newDataItem, () => {}));
  };

  const onDialogClose = (onDiscardAction: undefined | ((arg: { value: null }) => void)) => {
    if (dataItem.isNew) {
      SchedulerActions.discardNewItemToData(dispatch);
    }

    if (updatedRecurringDataItem) {
      SchedulerActions.changeUpdatedRecurringDataItem(dispatch, null);
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

            const setCustomerField = (dataItem: CustomerDataItem | undefined) => {
              formRenderProps.onChange(`FirstName`, { value: dataItem?.FirstName });
              formRenderProps.onChange(`LastNameAppt`, { value: dataItem?.Title });
              formRenderProps.onChange(`Email`, { value: dataItem?.Email ?? '' });
              formRenderProps.onChange(`Gender`, { value: dataItem?.Gender ?? '(1) Female' });
              formRenderProps.onChange(`CellPhone`, { value: dataItem?.CellPhone ?? '' });
            };

            return (
              <FormElement horizontal={true}>
                <fieldset className="k-form-fieldset">
                  <CustomMemoField
                    id="services"
                    name="LookupMultiBP01offeringsId"
                    label="Services"
                    component={ServicesFormMultiSelect}
                    disabled={isDataItemLoading}
                  />

                  <CustomMemoField
                    id="status"
                    name="AppointmentStatus"
                    label="Status"
                    data={StatusDropDownListData}
                    component={FormDropDownList}
                    disabled={isDataItemLoading}
                  />

                  <CustomMemoField
                    id="start"
                    name="Start"
                    label="Start"
                    component={FormDateTimePicker}
                    validator={requiredValidator}
                    disabled={isDataItemLoading}
                  />

                  <CustomMemoField
                    id="end"
                    name="End"
                    label="End"
                    component={FormDateTimePicker}
                    validator={requiredValidator}
                    disabled={isDataItemLoading}
                  />

                  <CustomMemoField
                    id="repeat"
                    name="Repeat"
                    label="Repeat"
                    component={FormDropDownListWithCustomData}
                    data={RepeatDropDownListData}
                    disabled={isDataItemLoading}
                  />

                  {repeatValue && (
                    <>
                      <CustomMemoField
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
                    <CustomMemoField
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
                        <CustomMemoField
                          id="RepeatOnMonthly"
                          name="RepeatOnMonthly"
                          label="Repeat on"
                          data={RepeatOnMonthlyRadioGroupData}
                          component={FormRadioGroup}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="col-md-6 monthly-group">
                        <CustomMemoField
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
                            <CustomMemoField
                              id="MonthlyWeekNumber"
                              name="MonthlyWeekNumber"
                              component={FormDropDownListWithCustomData}
                              data={WeekNumberDropDownListData}
                              disabled={repeatOnMonthlyValue === MonthlyTypes.Day || isDataItemLoading}
                            />
                          </div>
                          <div className="col-md-6 p-0">
                            <CustomMemoField
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
                        <CustomMemoField
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
                            <CustomMemoField
                              id="YearlyMonth"
                              name="YearlyMonth"
                              data={YearlyMonthTypeDropDownListData}
                              disabled={repeatOnYearlyValue === YearlyTypes.Week || isDataItemLoading}
                              component={FormDropDownListWithCustomData}
                            />
                          </div>
                          <div className="col-md-3 p-0">
                            <CustomMemoField
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
                            <CustomMemoField
                              id="YearlyWeekNumber"
                              name="YearlyWeekNumber"
                              component={FormDropDownListWithCustomData}
                              data={WeekNumberDropDownListData}
                              disabled={repeatOnYearlyValue === YearlyTypes.Day || isDataItemLoading}
                            />
                          </div>
                          <div className="col-md-4 p-0">
                            <CustomMemoField
                              id="YearlyDayType"
                              name="YearlyDayType"
                              data={MonthlyDayTypeDropDownListData}
                              disabled={repeatOnYearlyValue === YearlyTypes.Day || isDataItemLoading}
                              component={FormDropDownListWithCustomData}
                            />
                          </div>
                          <div className="d-flex align-items-center mr-2">of</div>
                          <div className="col-md-4 p-0">
                            <CustomMemoField
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
                        <CustomMemoField
                          id="endRepeat"
                          name="EndRepeat"
                          label="End"
                          component={FormRadioGroup}
                          data={EndRepeatRadioGroupData}
                          disabled={isDataItemLoading}
                        />
                      </div>
                      <div className="col-md-6 p-0 pt-5 align-self-end">
                        <CustomMemoField
                          id="endCount"
                          name="EndCount"
                          format="n0"
                          min={1}
                          defaultValue={1}
                          disabled={endRepeatValue !== EndRepeatTypes.After || isDataItemLoading}
                          secondLabel="occurrence(s)"
                          component={FormNumericTextBox}
                        />
                        <CustomMemoField
                          id="endUntil"
                          name="EndUntil"
                          disabled={endRepeatValue !== EndRepeatTypes.On || isDataItemLoading}
                          component={FormDateTimePicker}
                        />
                      </div>
                    </div>
                  )}

                  <CustomMemoField
                    id="staff"
                    name="LookupHR01teamId"
                    label="Support Stuff"
                    component={StaffFormDropDownList}
                    disabled={isDataItemLoading}
                  />

                  {isStatusConsultation ? null : (
                    <>
                      <CustomMemoField
                        id="customer"
                        name="LookupCM102customersId"
                        label="Customer"
                        setCustomerField={setCustomerField}
                        component={CustomersFormComboBox}
                        disabled={isDataItemLoading}
                        validator={requiredDropDownListValidator}
                      />

                      <CustomMemoField
                        id="firstName"
                        name="FirstName"
                        label="First Name"
                        component={FormInput}
                        validator={requiredValidator}
                        disabled={isDataItemLoading}
                      />

                      <CustomMemoField
                        id="lastName"
                        name="LastNameAppt"
                        label="Last Name"
                        component={FormInput}
                        validator={requiredValidator}
                        disabled={isDataItemLoading}
                      />

                      <CustomMemoField
                        id="gender"
                        name="Gender"
                        label="Gender"
                        layout="horizontal"
                        component={FormRadioGroup}
                        data={GendersRadioGroupData}
                        disabled={isDataItemLoading}
                      />

                      <CustomMemoField
                        id="email"
                        name="Email"
                        label="Email"
                        type="email"
                        component={FormInput}
                        validator={emailValidator}
                        disabled={isDataItemLoading}
                      />

                      <CustomMemoField
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

                  <CustomMemoField id="notes" name="Notes" label="Notes" component={FormTextArea} disabled={isDataItemLoading} />

                  <div className="form__actions-bar-wrapper">
                    <DialogActionsBar>
                      <button className="k-button" type="submit" disabled={isDataItemLoading || !formRenderProps.allowSubmit}>
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
