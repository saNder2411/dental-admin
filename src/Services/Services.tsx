import React, { FC } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import { FlagCell, CurrencyCell, DiscountCell, TotalPriceCell, ServicesIcon, ReferenceCell } from '../_sections';

import { ServicesGridData } from './ServicesMockData';

export const Services: FC = (): JSX.Element => {
  const localizationService = useLocalization();

  return (
    <div id="Grid" className="stylists-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={ServicesGridData}>
            <GridColumn width={100} cell={ServicesIcon} />
            <GridColumn
              field={'offerID'}
              title={localizationService.toLanguageString('custom.offeringId', 'Offering ID')}
              columnMenu={ColumnMenu}
              filter={'numeric'}
              width={120}
            />
            <GridColumn
              field={'references'}
              title={localizationService.toLanguageString('custom.references', 'References')}
              columnMenu={ColumnMenu}
              cell={ReferenceCell}
              filter={'text'}
            />
            <GridColumn
              field={'category'}
              title={localizationService.toLanguageString('custom.category', 'Category')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'duration'}
              title={localizationService.toLanguageString('custom.duration', 'Duration (mins)')}
              columnMenu={ColumnMenu}
              filter={'numeric'}
            />
            <GridColumn
              field={'isShowOnline'}
              title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
              columnMenu={ColumnMenu}
              cell={FlagCell}
              filter={'boolean'}
            />
            <GridColumn
              field={'isConsultation'}
              title={localizationService.toLanguageString('custom.consultation', 'Consultation')}
              columnMenu={ColumnMenu}
              cell={FlagCell}
              filter={'boolean'}
            />
            <GridColumn
              field={'price'}
              title={localizationService.toLanguageString('custom.price', 'Price')}
              columnMenu={ColumnMenu}
              width={90}
              cell={CurrencyCell}
              filter={'numeric'}
            />
            <GridColumn
              field={'discount'}
              title={localizationService.toLanguageString('custom.discount', 'Discount %')}
              columnMenu={ColumnMenu}
              cell={DiscountCell}
              filter={'numeric'}
            />
            <GridColumn
              field={''}
              title={localizationService.toLanguageString('custom.total', 'Total')}
              columnMenu={ColumnMenu}
              width={90}
              cell={TotalPriceCell}
              filter={'numeric'}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
