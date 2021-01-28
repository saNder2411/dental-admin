import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  CustomersTextCell,
  CustomersGenderCell,
  CustomersSvcStaffCell,
  CustomersDateCell,
  CustomersDateCellNoEditable,
  CustomersLastAppointmentsCell,
  CustomersMobilePhoneCell,
  CustomersAvatarCell,
  CustomersActionsControlCell,
} from '../_sections';
import { Loader } from '../_components';
// Types
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
import { EntitiesKeys } from '../_bus/Entities/EntitiesTypes';
// Selectors
import { selectOriginalStaffDataLength } from '../_bus/Entities/EntitiesSelectors';
// Hooks
import { useSelectCustomersData, useFetchCustomersData } from './CustomersHooks';

export const Customers: FC = (): JSX.Element => {
  const { customersData, isDataLoading } = useSelectCustomersData();
  const staffDataLength = useSelector(selectOriginalStaffDataLength);
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchCustomersData(customersData.length, staffDataLength, dispatch);

  const contentTSX = !isDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid data={customersData} entityName={EntitiesKeys.Customers} labelNewItemBtn="New Customer">
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
            cell={((CustomersTextCell as unknown) as unknown) as CustomGridCell}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'FirstName'}
            title={localizationService.toLanguageString('custom.firstName', 'First Name')}
            cell={(CustomersTextCell as unknown) as CustomGridCell}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'Gender'}
            title={localizationService.toLanguageString('custom.gender', 'Gender')}
            columnMenu={ColumnMenu}
            cell={(CustomersGenderCell as unknown) as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'SvcStaff'}
            title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
            columnMenu={ColumnMenu}
            cell={(CustomersSvcStaffCell as unknown) as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Upcoming'}
            title={localizationService.toLanguageString('custom.upcoming', 'Upcoming')}
            columnMenu={ColumnMenu}
            cell={(CustomersDateCell as unknown) as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'LookupMultiHR01teamId'}
            title={localizationService.toLanguageString('custom.lastAppointments', 'Last Appointments')}
            columnMenu={ColumnMenu}
            cell={(CustomersLastAppointmentsCell as unknown) as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Email'}
            title={localizationService.toLanguageString('custom.email', 'Email')}
            columnMenu={ColumnMenu}
            cell={(CustomersTextCell as unknown) as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'CellPhone'}
            title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
            columnMenu={ColumnMenu}
            cell={(CustomersMobilePhoneCell as unknown) as CustomGridCell}
            filter={'text'}
            width={140}
          />
          <GridColumn
            field={'Modified'}
            title={localizationService.toLanguageString('custom.lastUpdate', 'Last Update')}
            columnMenu={ColumnMenu}
            cell={(CustomersDateCellNoEditable as unknown) as CustomGridCell}
            editable={false}
            filter={'date'}
            width={140}
          />
          <GridColumn
            field={'ClientPhotoUrl'}
            title={localizationService.toLanguageString('custom.photo', 'Photo')}
            cell={(CustomersAvatarCell as unknown) as CustomGridCell}
            width={120}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.actions', 'Actions')}
            cell={(CustomersActionsControlCell as unknown) as CustomGridCell}
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
