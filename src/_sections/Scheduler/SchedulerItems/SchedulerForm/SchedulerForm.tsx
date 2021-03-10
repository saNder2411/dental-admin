import React, { FC, useMemo, useState, useCallback, useEffect, SyntheticEvent } from 'react';
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
  IsNewCustomerFormCheckbox,
} from './SchedulerFormItemsCustom';
import { FormInput, FormRadioGroup, FormMaskedTextBox, FormDateTimePicker, FormTextArea, FormNumericTextBox, FormDropDownList } from './SchedulerFormItems';
// Selectors
import { selectCustomersById, selectStaffById, selectServicesById, selectMemoCustomersAllIds } from '../../../../_bus/Entities/EntitiesSelectors';
import { selectMemoUpdatableRecurringDataItem } from '../../../../_bus/Scheduler/SchedulerSelectors';
import { selectDataItemErrorMessage } from '../../../../_bus/UI/UISelectors';
// Types
import { AppointmentDataItem, StatusNames } from '../../../../_bus/_Appointments/AppointmentsTypes';
import { EntitiesKeys } from '../../../../_bus/Entities/EntitiesTypes';
// import { CustomerDataItem } from '../../../../_bus/_Customers/CustomersTypes';
import { InitialFormValue } from './SchedulerFormTypes';
// Actions
import {
  updateAppointmentRecurringDataItemInitAsyncAC,
  updateAppointmentDataItemInitAsyncAC,
  createAppointmentDataItemInitAsyncAC,
  cancelEditAC,
} from '../../../../_bus/Entities/EntitiesAC';
import { changeUpdatedRecurringDataItemAC, discardAddNewItemToDataInSchedulerAC } from '../../../../_bus/Scheduler/SchedulerAC';
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
  parseFormDataItem,
  requiredValidator,
  requiredCustomerDropDownListValidator,
  phoneValidator,
  emailValidator,
  getSecondLabelForRepeatEvery,
} from './SchedulerFormHelpers';

interface Props {
  dataItem: AppointmentDataItem;
  onHideForm?: () => void;
}

export const SchedulerForm: FC<Props> = ({ dataItem, onHideForm = () => void 0 }): JSX.Element => {
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(`SchedulerFormDataItem`, dataItem);
  const dataItemErrorMessage = useSelector(selectDataItemErrorMessage);

  const selectUpdatableRecurringDataItem = useMemo(selectMemoUpdatableRecurringDataItem, []);
  const updatableRecurringDataItem = useSelector(selectUpdatableRecurringDataItem);

  const servicesById = useSelector(selectServicesById());
  const staffById = useSelector(selectStaffById());
  const customersById = useSelector(selectCustomersById());

  const selectCustomersAllIds = useMemo(selectMemoCustomersAllIds, []);
  const customersAllIds = useSelector(selectCustomersAllIds);

  const initialValue = getInitialFormValue(dataItem);

  const onFormSubmit = (formDataItem: InitialFormValue, evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { newDataItem, newCustomer } = parseFormDataItem(formDataItem, customersAllIds, servicesById);

    setIsDataItemLoading(true);

    if (updatableRecurringDataItem && dataItem.isNew) {
      dispatch(updateAppointmentRecurringDataItemInitAsyncAC(updatableRecurringDataItem, newDataItem, newCustomer, servicesById, staffById, customersById, onHideForm));
      return;
    }

    dataItem.isNew
      ? dispatch(createAppointmentDataItemInitAsyncAC(newDataItem, newCustomer, servicesById, staffById, customersById, onHideForm))
      : dispatch(updateAppointmentDataItemInitAsyncAC(newDataItem, newCustomer, servicesById, staffById, customersById, onHideForm));
  };

  const onDialogClose = useCallback(() => {
    onHideForm();

    if (dataItem.isNew && updatableRecurringDataItem) {
      dispatch(discardAddNewItemToDataInSchedulerAC());
      dispatch(changeUpdatedRecurringDataItemAC(null));
      return;
    }

    if (dataItem.isNew) {
      dispatch(discardAddNewItemToDataInSchedulerAC());
      return;
    }

    dispatch(cancelEditAC(dataItem.ID, EntitiesKeys.Appointments));
  }, [dataItem.ID, dataItem.isNew, dispatch, onHideForm, updatableRecurringDataItem]);

  useEffect(
    () => () => {
      if (dataItemErrorMessage) {
        onDialogClose();
      }
    },
    [dataItemErrorMessage, onDialogClose]
  );

  return (
    <Dialog title="Event" onClose={() => !isDataItemLoading && onDialogClose()} width={700}>
      <SC.SchedulerForm>
        <Form
          initialValues={initialValue}
          onSubmit={onFormSubmit as any}
          render={(formRenderProps) => {
            const repeatValue = formRenderProps.valueGetter('Repeat');
            const endRepeatValue = formRenderProps.valueGetter('EndRepeat');
            const repeatOnMonthlyValue = formRenderProps.valueGetter('RepeatOnMonthly');
            const repeatOnYearlyValue = formRenderProps.valueGetter('RepeatOnYearly');
            const isStatusConsultation = formRenderProps.valueGetter('AppointmentStatus') === StatusNames.Consultation;
            const secondLabelForRepeatEvery = getSecondLabelForRepeatEvery(repeatValue);
            const isNewCustomer = formRenderProps.valueGetter('IsNewCustomer');
            const startAppointmentValue = formRenderProps.valueGetter('Start') as Date;
            const endAppointmentValue = formRenderProps.valueGetter('End') as Date;

            // const setCustomerField = (customerDataItem: CustomerDataItem | undefined) => {
            //   formRenderProps.onChange(`FirstName`, { value: customerDataItem?.FirstName });
            //   formRenderProps.onChange(`LastName`, { value: customerDataItem?.Title });
            //   formRenderProps.onChange(`Email`, { value: customerDataItem?.Email ?? '' });
            //   formRenderProps.onChange(`Gender`, { value: customerDataItem?.Gender ?? '(1) Female' });
            //   formRenderProps.onChange(`CellPhone`, { value: customerDataItem?.CellPhone ?? '' });
            // };

            const resetCustomerId = () => formRenderProps.onChange(`LookupCM102customersId`, { value: null });
            const setEndDateOnServiceChange = (startDate: Date) => (serviceById: typeof servicesById) => (servicesId: number[]) => {
              const allServicesDurationMs = servicesId.reduce((sum, serviceID) => (sum += serviceById[serviceID].MinutesDuration ?? 0), 0) * 60 * 1000;
              allServicesDurationMs > 0 && formRenderProps.onChange('End', { value: new Date(startDate.getTime() + allServicesDurationMs) });
            };
            const setEndDateOnStartChange = (dateRangeInMs: number) => (startDate: Date) =>
              formRenderProps.onChange('End', { value: new Date(startDate.getTime() + dateRangeInMs) });

            return (
              <FormElement horizontal={true}>
                <fieldset className="k-form-fieldset">
                  <CustomMemoField
                    id="services"
                    name="LookupMultiBP01offeringsId"
                    label="Services"
                    setEndDateOnServiceChange={setEndDateOnServiceChange(startAppointmentValue)(servicesById)}
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
                    setEndDateOnStartChange={setEndDateOnStartChange(endAppointmentValue.getTime() - startAppointmentValue.getTime())}
                    component={FormDateTimePicker}
                    validator={requiredValidator}
                    disabled={isDataItemLoading}
                  />

                  <CustomMemoField id="end" name="End" label="End" component={FormDateTimePicker} validator={requiredValidator} disabled={isDataItemLoading} />

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
                    <CustomMemoField id="RepeatOnWeekday" name="RepeatOnWeekday" label="Repeat on" component={WeekdayFormButtonGroup} disabled={isDataItemLoading} />
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

                  <CustomMemoField id="staff" name="LookupHR01teamId" label="Support Staff" component={StaffFormDropDownList} disabled={isDataItemLoading} />

                  {isStatusConsultation ? null : (
                    <>
                      <div className="customer-fields d-flex">
                        <CustomMemoField
                          id="customer"
                          name="LookupCM102customersId"
                          label="Customer"
                          isNewCustomer={isNewCustomer}
                          // setCustomerField={setCustomerField}
                          component={CustomersFormComboBox}
                          disabled={isDataItemLoading || isNewCustomer}
                          validator={requiredCustomerDropDownListValidator(isNewCustomer)}
                        />
                        <CustomMemoField
                          id={'isNewCustomer'}
                          name={'IsNewCustomer'}
                          label={'New Customer?'}
                          resetCustomerId={resetCustomerId}
                          component={IsNewCustomerFormCheckbox}
                          disabled={isDataItemLoading}
                        />
                      </div>

                      {isNewCustomer ? (
                        <>
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
                            name="LastName"
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

                          <CustomMemoField
                            id="clientPhotoUrl"
                            name="ClientPhotoUrl"
                            label="Photo"
                            type="text"
                            placeholder="Link to customer photo"
                            component={FormInput}
                            disabled={isDataItemLoading}
                          />
                        </>
                      ) : null}
                    </>
                  )}

                  <CustomMemoField id="notes" name="Notes" label="Notes" component={FormTextArea} disabled={isDataItemLoading} />

                  <div className="form__actions-bar-wrapper">
                    <DialogActionsBar>
                      <button className="k-button" type="submit" disabled={isDataItemLoading || !formRenderProps.allowSubmit}>
                        {isDataItemLoading ? (
                          <Loader className="d-flex justify-content-center align-items-center" type="pulsing" isLoading={isDataItemLoading} themeColor="primary" />
                        ) : (
                          `Save`
                        )}
                      </button>
                      <button className="k-button" onClick={onDialogClose} disabled={isDataItemLoading}>
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
