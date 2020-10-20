import React, { FC } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_components';
import { CurrencyCell, DateCell, ClockCell } from '../_components';

import { homeGridData } from './HomeMockData';

export const Home: FC = (): JSX.Element => {
  const localizationService = useLocalization();

  return (
    <div id="Dashboard" className="home-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={homeGridData}>
            <GridColumn title={localizationService.toLanguageString('custom.performance', 'Performance')}>
              <GridColumn field={''} title={localizationService.toLanguageString('', '')} width={100} cell={ClockCell} />
              <GridColumn
                field={'status'}
                title={localizationService.toLanguageString('custom.status', 'Status')}
                columnMenu={ColumnMenu}
                width={100}
                filter={'text'}
              />
              <GridColumn
                field={'references'}
                title={localizationService.toLanguageString('custom.references', 'References')}
                columnMenu={ColumnMenu}
                width={100}
                filter={'text'}
              />
              <GridColumn
                field={'start'}
                title={localizationService.toLanguageString('custom.start', 'Start')}
                columnMenu={ColumnMenu}
                cell={DateCell}
                // width={120}
                filter={'text'}
              />
              <GridColumn
                field={'end'}
                title={localizationService.toLanguageString('custom.end', 'End')}
                columnMenu={ColumnMenu}
                cell={DateCell}
                // width={120}
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
                field={'services'}
                title={localizationService.toLanguageString('custom.services', 'Services')}
                columnMenu={ColumnMenu}
                // width={120}
                filter={'text'}
              />
              <GridColumn
                field={'budget'}
                title={localizationService.toLanguageString('custom.total', 'Total')}
                columnMenu={ColumnMenu}
                width={90}
                cell={CurrencyCell}
                filter={'numeric'}
              />
            </GridColumn>
            <GridColumn title={localizationService.toLanguageString('custom.contacts', 'Contacts')}>
              <GridColumn
                field={'lastName'}
                title={localizationService.toLanguageString('custom.lastName', 'Last Name')}
                columnMenu={ColumnMenu}
                width={120}
                filter={'text'}
              />
              <GridColumn
                field={'firstName'}
                title={localizationService.toLanguageString('custom.firstName', 'First Name')}
                columnMenu={ColumnMenu}
                width={120}
                filter={'text'}
              />
              <GridColumn
                field={'phone'}
                title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
                columnMenu={ColumnMenu}
                // width={120}
              />
              <GridColumn
                field={'lastUpdate'}
                title={localizationService.toLanguageString('custom.lastUpdate', 'Last Update')}
                columnMenu={ColumnMenu}
                cell={DateCell}
                // width={120}
                filter={'date'}
              />
              <GridColumn
                field={'eventId'}
                title={localizationService.toLanguageString('custom.eventId', 'Event ID')}
                columnMenu={ColumnMenu}
                width={100}
                filter={'text'}
              />
            </GridColumn>
          </Grid>
        </div>
      </div>
    </div>
  );
};
