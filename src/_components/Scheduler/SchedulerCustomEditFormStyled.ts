import styled from 'styled-components';

export const SchedulerCustomEditForm = styled.section`
  padding: 1rem;
  padding-bottom: 0;

  && .k-form-fieldset {
    height: 622px;
    display: flex;
    flex-direction: column;
  }

  && .k-form-horizontal .k-form-field {
    flex-wrap: wrap;
  }

  && .k-form-fieldset > .k-form-field:nth-last-child(2) {
    margin-bottom: 18px;
  }

  && .k-label {
    width: 126px;
  }

  && .k-form .k-textbox,
  .k-form .k-autocomplete,
  .k-form .k-combobox,
  .k-form .k-dropdown,
  .k-form .k-dropdowntree,
  .k-form .k-multiselect,
  .k-form .k-dropdowntree,
  .k-form .k-dateinput,
  .k-form .k-datepicker,
  .k-form .k-datetimepicker,
  .k-form .k-daterangepicker-wrap,
  .k-form .k-timepicker,
  .k-form .k-maskedtextbox,
  .k-form .k-textbox-container,
  .k-form .k-floating-label-container {
    width: 75%;
  }

  && .k-form .k-textarea,
  && .k-dropdown {
    width: calc(65% - 32px);
  }

  & .k-form .k-numerictextbox {
    width: 70px;
  }

  & .k-combobox .k-dropdown-wrap,
  .k-picker-wrap.k-state-default {
    width: calc(80% - 1px);
  }

  & .k-textarea > .k-input {
    width: 100%;
  }

  .form__actions-bar-wrapper {
    margin-left: -1rem;
    margin-right: -1rem;
    margin-top: auto;
    border-color: #ebebeb;
  }

  && .k-radio-item {
    text-align: left;
  }

  .col-md-6 .k-form-field {
    margin-top: 0;
  }

  && .col-md-6.monthly-group,
  && .col-md-6.yearly-group {
    padding: 0;
    padding-top: 12px;
  }

  .k-button-group .k-button {
    border-radius: none;
    width: 50px;
    height: 30px;
  }

  .monthly-group .k-dropdown,
  .yearly-group .k-dropdown {
    width: 80%;
  }

  .yearly-group-dropdown {
    margin: 0;
    margin-right: -30px;
  }

  .yearly-group-dropdown .k-dropdown {
    width: 100%;
  }
`;
