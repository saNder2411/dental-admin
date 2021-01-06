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
  GenericDateCellNoEditable,
  CustomersLastAppointmentsCell,
  CustomersMobilePhoneCell,
  GenericAvatarCell,
  CustomersActionsControlCell,
} from '../_sections';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
// Selectors
import { selectDataName, selectOriginalStaffDataLength } from '../_sections/Grid/GridSelectors';
// Hooks
import { useSetGridDataForDomainWithDataBind } from '../_sections/Grid/GridHooks';
import { useSelectCustomersData, useFetchCustomersData } from './CustomersHooks';

export const Customers: FC = (): JSX.Element => {
  const dataName = useSelector(selectDataName);
  const { customersData, isDataLoading } = useSelectCustomersData();
  const staffDataLength = useSelector(selectOriginalStaffDataLength);
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchCustomersData(customersData.length, staffDataLength, dispatch);
  useSetGridDataForDomainWithDataBind(dataName, GridDataName.Customers, customersData, isDataLoading, dispatch);

  const hasCustomersData = dataName === GridDataName.Customers;
  const contentTSX = hasCustomersData && !isDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid>
          <GridColumn
            field={'Id'}
            title={localizationService.toLanguageString('custom.ID', 'ID')}
            columnMenu={ColumnMenu}
            editable={false}
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
            field={'LookupMultiHR01teamId'}
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
            cell={CustomersMobilePhoneCell as CustomGridCell}
            filter={'text'}
            width={140}
          />
          <GridColumn
            field={'Modified'}
            title={localizationService.toLanguageString('custom.lastUpdate', 'Last Update')}
            columnMenu={ColumnMenu}
            cell={GenericDateCellNoEditable as CustomGridCell}
            editable={false}
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
            cell={CustomersActionsControlCell as CustomGridCell}
            width={140}
          />
        </Grid>
      </div>
    </div>
  );

  return (
    <>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </>
  );
};
