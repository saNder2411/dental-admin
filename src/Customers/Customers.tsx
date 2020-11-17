import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import { DateCell, AvatarCell, ActionsControlCell, GenderCell } from '../_sections';
// Mock
import { CustomersGridData } from './CustomersMockData';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';
// Hooks
import { useGridStateForDomain } from '../_sections/Grid/GridHooks';

export const Customers: FC = (): JSX.Element => {
  const { data, dataName, GridActions } = useGridStateForDomain();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useEffect(() => {
    if (dataName === GridDataName.Customers) return;

    GridActions.setData(dispatch, CustomersGridData.slice());
  }, [dataName, GridActions, dispatch]);

  const hasCustomersData = dataName === GridDataName.Customers;

  return (
    <div id="Grid" className="stylists-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={hasCustomersData ? data : []}>
            <GridColumn
              field={'teamID'}
              title={localizationService.toLanguageString('custom.teamID', 'Team ID')}
              columnMenu={ColumnMenu}
              width={120}
              filter={'numeric'}
            />
            <GridColumn
              field={'lastName'}
              title={localizationService.toLanguageString('custom.lastName', 'Last Name')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'firstName'}
              title={localizationService.toLanguageString('custom.firstName', 'First Name')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'gender'}
              title={localizationService.toLanguageString('custom.gender', 'Gender')}
              columnMenu={ColumnMenu}
              cell={GenderCell as CustomGridCell}
              filter={'text'}
            />
            <GridColumn
              field={'svcStaff'}
              title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'upcoming'}
              title={localizationService.toLanguageString('custom.upcoming', 'Upcoming')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'email'}
              title={localizationService.toLanguageString('custom.email', 'Email')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'mobilePhone'}
              title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
              columnMenu={ColumnMenu}
              filter={'numeric'}
              width={140}
            />
            <GridColumn
              field={'lastUpdate'}
              title={localizationService.toLanguageString('custom.lastUpdate', 'Last Update')}
              columnMenu={ColumnMenu}
              cell={DateCell as CustomGridCell}
              filter={'date'}
              width={140}
            />
            <GridColumn
              field={'photo'}
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
    </div>
  );
};
