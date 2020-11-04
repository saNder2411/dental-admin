import React, { FC } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import { PhotoCell, FlagCell } from '../_sections';

import { StylistsGridData } from './StylistsMockData';

export const Stylists: FC = (): JSX.Element => {
  const localizationService = useLocalization();

  return (
    <div id="Grid" className="stylists-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={StylistsGridData}>
            <GridColumn
              field={'teamId'}
              title={localizationService.toLanguageString('custom.teamId', 'Team ID')}
              columnMenu={ColumnMenu}
              width={130}
              filter={'numeric'}
            />
            <GridColumn
              field={'photo'}
              title={localizationService.toLanguageString('custom.photo', 'Photo')}
              cell={PhotoCell}
              width={120}
            />
            <GridColumn
              field={'fullName'}
              title={localizationService.toLanguageString('custom.fullName', 'Name')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'jobTitle'}
              title={localizationService.toLanguageString('custom.jobTitle', 'Job Title')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'isShowOnline'}
              title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
              columnMenu={ColumnMenu}
              cell={FlagCell}
              filter={'boolean'}
            />
            <GridColumn
              field={'mobilePhone'}
              title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
              columnMenu={ColumnMenu}
              filter={'numeric'}
            />
            <GridColumn
              field={'email'}
              title={localizationService.toLanguageString('custom.email', 'Email')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
