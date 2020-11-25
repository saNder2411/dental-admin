import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  GenericTextCell,
  GenericGenderCell,
  CustomersSvcStaffCell,
  GenericDateCell,
  CustomersLastAppointmentsCell,
  GenericAvatarCell,
  ActionsControlCell,
} from '../_sections';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';
// Selectors
import { selectGridDataName } from '../_sections/Grid/GridSelectors';
// Actions
import { GridActions } from '../_sections/Grid/GridActions';
import { CustomersActions } from './CustomersActions';
// Hooks
import { useSetGridDataForDomainWithDataBind } from '../_sections/Grid/GridHooks';
import { useCustomersStateForDomain, useActionMetaForCustomersFetchData, useFetchCustomersData } from './CustomersHooks';

export const Customers: FC = (): JSX.Element => {
  const dataName = useSelector(selectGridDataName);
  const { customersData, customersIsDataLoading } = useCustomersStateForDomain();
  const teamStaffDataLength = useActionMetaForCustomersFetchData();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchCustomersData(customersData.length, teamStaffDataLength, CustomersActions, dispatch);
  useSetGridDataForDomainWithDataBind(dataName, GridDataName.Customers, customersData, customersIsDataLoading, GridActions, dispatch);

  const hasCustomersData = dataName === GridDataName.Customers;
  const contentTSX = hasCustomersData && !customersIsDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid>
          <GridColumn
            field={'Id'}
            title={localizationService.toLanguageString('custom.teamID', 'Team ID')}
            columnMenu={ColumnMenu}
            cell={GenericTextCell as CustomGridCell}
            width={120}
            filter={'numeric'}
          />
          <GridColumn
            field={'Title'}
            title={localizationService.toLanguageString('custom.lastName', 'Last Name')}
            cell={GenericTextCell as CustomGridCell}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'FirstName'}
            title={localizationService.toLanguageString('custom.firstName', 'First Name')}
            cell={GenericTextCell as CustomGridCell}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'Gender'}
            title={localizationService.toLanguageString('custom.gender', 'Gender')}
            columnMenu={ColumnMenu}
            cell={GenericGenderCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'SvcStaff'}
            title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
            columnMenu={ColumnMenu}
            cell={CustomersSvcStaffCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Upcoming'}
            title={localizationService.toLanguageString('custom.upcoming', 'Upcoming')}
            columnMenu={ColumnMenu}
            cell={GenericDateCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'LookupMultiHR01team'}
            title={localizationService.toLanguageString('custom.lastAppointments', 'Last Appointments')}
            columnMenu={ColumnMenu}
            cell={CustomersLastAppointmentsCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Email'}
            title={localizationService.toLanguageString('custom.email', 'Email')}
            columnMenu={ColumnMenu}
            cell={GenericTextCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'CellPhone'}
            title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
            columnMenu={ColumnMenu}
            cell={GenericTextCell as CustomGridCell}
            filter={'text'}
            width={140}
          />
          <GridColumn
            field={'Modified'}
            title={localizationService.toLanguageString('custom.lastUpdate', 'Last Update')}
            columnMenu={ColumnMenu}
            cell={GenericDateCell as CustomGridCell}
            filter={'date'}
            width={140}
          />
          <GridColumn
            field={'ClientPhotoUrl'}
            title={localizationService.toLanguageString('custom.photo', 'Photo')}
            cell={GenericAvatarCell as CustomGridCell}
            width={120}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.actions', 'Actions')}
            cell={ActionsControlCell as CustomGridCell}
            width={140}
          />
        </Grid>
      </div>
    </div>
  );

  return (
    <div id="Grid" className="stylists-page main-content">
      {contentTSX}
      <Loader className="mt-5" isLoading={customersIsDataLoading} size={'large'} type="infinite-spinner" />
    </div>
  );
};
