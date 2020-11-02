import styled from 'styled-components';

export const SchedulerCustomEditForm = styled.section`
  padding: 2rem;

  && .k-form-horizontal .k-form-field {
    flex-wrap: wrap;
    /* align-items: center; */
  }

  && .k-label {
    width: 127px;
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
    width: 70%;
  }

  && .k-form .k-textarea {
    width: calc(60% - 34px);
  }

  & .k-form .k-numerictextbox {
    width: 70px;
  }

  & .k-combobox .k-dropdown-wrap,
  .k-picker-wrap.k-state-default {
    width: calc(80% - 7px);
  }

  & .k-textarea > .k-input {
    width: 100%;
  }

  .form__actions-bar-wrapper {
    margin: -2rem;
    border-color: #ebebeb;
  }

  && .k-radio-item {
    text-align: left;
  }

  .col-md-6 .k-form-field {
    margin-top: 0;
  }

  && .col-md-6.monthly-group {
    padding: 0;
    padding-top: 12px;
  }

  .k-button-group .k-button {
    border-radius: none;
    width: 50px;
    height: 30px;
  }

  .monthly-group .k-dropdown {
    width: 80%;
  }
`;
