import styled from 'styled-components';

export const SchedulerCustomEditForm = styled.section`
  padding: 2rem;

  && .k-form-horizontal .k-form-field {
    flex-wrap: wrap;
  }

  && .k-label {
    width: 20%;
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
  .k-form .k-numerictextbox,
  .k-form .k-maskedtextbox,
  .k-form .k-textbox-container,
  .k-form .k-floating-label-container {
    width: 70%;
  }

  && .k-form .k-textarea {
    width: calc(60% - 34px);
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
`;
