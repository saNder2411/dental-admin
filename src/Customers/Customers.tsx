import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import { DateCell, AvatarCell, ActionsControlCell, GenderCell, SvcStaffCell, LastAppointmentsCell } from '../_sections';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';
// Hooks
import { useGridStateForDomain, useFetchDataForDomain, useSetGridData } from '../_sections/Grid/GridHooks';
import { useCustomersStateForDomain } from './CustomersHooks';

export const Customers: FC = (): JSX.Element => {
  const { data, dataName, GridActions } = useGridStateForDomain();
  const { customersData, customersIsDataLoading, CustomersActions } = useCustomersStateForDomain();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchDataForDomain(customersData.length, CustomersActions, dispatch);
  useSetGridData(dataName, GridDataName.Customers, customersData, GridActions, dispatch);

  const hasCustomersData = dataName === GridDataName.Customers;
  const contentTSX = hasCustomersData && !customersIsDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid data={data}>
          <GridColumn
            field={'ID'}
            title={localizationService.toLanguageString('custom.teamID', 'Team ID')}
            columnMenu={ColumnMenu}
            width={120}
            filter={'numeric'}
          />
          <GridColumn
            field={'Title'}
            title={localizationService.toLanguageString('custom.lastName', 'Last Name')}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'FirstName'}
            title={localizationService.toLanguageString('custom.firstName', 'First Name')}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'Gender'}
            title={localizationService.toLanguageString('custom.gender', 'Gender')}
            columnMenu={ColumnMenu}
            cell={GenderCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'SvcStaff'}
            title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
            columnMenu={ColumnMenu}
            cell={SvcStaffCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Upcoming'}
            title={localizationService.toLanguageString('custom.upcoming', 'Upcoming')}
            columnMenu={ColumnMenu}
            cell={DateCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'LookupMultiAppointments'}
            title={localizationService.toLanguageString('custom.lastAppointments', 'Last Appointments')}
            columnMenu={ColumnMenu}
            cell={LastAppointmentsCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn field={'Email'} title={localizationService.toLanguageString('custom.email', 'Email')} columnMenu={ColumnMenu} filter={'text'} />
          <GridColumn
            field={'CellPhone'}
            title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
            columnMenu={ColumnMenu}
            filter={'numeric'}
            width={140}
          />
          <GridColumn
            field={'Modified'}
            title={localizationService.toLanguageString('custom.lastUpdate', 'Last Update')}
            columnMenu={ColumnMenu}
            cell={DateCell as CustomGridCell}
            filter={'date'}
            width={140}
          />
          <GridColumn
            field={'ClientPhotoUrl'}
            title={localizationService.toLanguageString('custom.photo', 'Photo')}
            cell={AvatarCell as CustomGridCell}
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
