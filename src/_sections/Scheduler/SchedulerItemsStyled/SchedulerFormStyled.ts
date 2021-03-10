import styled from 'styled-components';

export const SchedulerForm = styled.section`
  padding: 1rem;
  padding-bottom: 0;

  && .k-form-fieldset {
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

  & .k-form-field-wrap .k-widget.k-dropdown.k-header,
  .k-form-field-wrap .k-widget.k-combobox.k-header.k-combobox-clearable {
    width: calc(80% - 23px);
  }

  & .k-form-field-wrap .k-dropdown-wrap {
    width: 100%;
  }

  && .k-multiselect-wrap,
  .k-picker-wrap,
  .k-picker-wrap {
    width: calc(80% - 1px);
  }

  & .k-textarea > .k-input {
    width: 100%;
  }

  .form__actions-bar-wrapper {
    margin-left: -1rem;
    margin-right: -1rem;
    margin-top: 60px;
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

  .monthly-group .k-dropdown {
    width: 80%;
  }

  .RepeatOnYearly {
    display: flex;

    .RepeatOnYearly__fields {
      width: 400px;
      padding-top: 12px;

      & .k-form-field {
        margin-top: 0;
      }
    }
  }

  .yearly-group__label {
    width: 160px;
  }

  .yearly-group .k-dropdown {
    width: 70%;
  }

  .yearly-group {
    & .k-label.k-label-empty {
      padding-top: 0;
    }

    & .k-widget.k-dropdown.k-header {
      width: 95%;
    }
  }

  .yearly-group-dropdown {
    margin: 0;
  }

  && .customer-fields .k-widget.k-combobox.k-header.k-combobox-clearable {
    width: 100%;
  }

  && .customer-fields .k-form-field:first-child {
    margin-right: 20px;
  }
`;
