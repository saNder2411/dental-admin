import React, { FC } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_components';
import { DateCell, CustomerPhotoCell } from '../_components';

import { CustomersGridData } from './CustomersMockData';

export const Customers: FC = (): JSX.Element => {
  const localizationService = useLocalization();

  return (
    <div id="Grid" className="stylists-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={CustomersGridData}>
            <GridColumn
              field={'teamId'}
              title={localizationService.toLanguageString('custom.teamId', 'Team ID')}
              columnMenu={ColumnMenu}
              width={130}
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
              filter={'text'}
            />
            <GridColumn
              field={'svcStaff'}
              title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
              columnMenu={ColumnMenu}
              width={110}
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
            />
            <GridColumn
              field={'lastUpdate'}
              title={localizationService.toLanguageString('custom.lastUpdate', 'Last Update')}
              columnMenu={ColumnMenu}
              cell={DateCell}
              filter={'date'}
            />
            <GridColumn
              field={'photo'}
              title={localizationService.toLanguageString('custom.photo', 'Photo')}
              cell={CustomerPhotoCell}
              width={120}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
