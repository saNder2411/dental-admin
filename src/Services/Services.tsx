import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  BooleanFlagCell,
  CurrencyCell,
  DiscountCell,
  TotalPriceCell,
  ServicesIcon,
  ReferenceCell,
  ActionsControlCell,
  DurationCell,
} from '../_sections';
// Mock
import { ServicesGridData } from './ServicesMockData';
// Selectors
import { selectGridState } from '../_sections/Grid';
// Types
import { GridDataName } from '../_sections/Grid';

export const Services: FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const { data, editField, setData, onItemChange, onAddNewItem, titleForAddNewItemSection, dataName } = useSelector(selectGridState);
  const localizationService = useLocalization();

  useEffect(() => {
    if (dataName === GridDataName.Services) return;

    setData(dispatch, ServicesGridData.slice());
  }, [dataName, setData, dispatch]);

  const hasServicesData = dataName === GridDataName.Services;

  const onGridItemChange = useCallback(onItemChange(dispatch), [dispatch, onItemChange]);
  const onAddNewGridItem = useCallback(() => onAddNewItem(dispatch), [dispatch, onAddNewItem]);

  return (
    <div id="Grid" className="stylists-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid
            data={hasServicesData ? data : []}
            editField={editField}
            addItemTitle={titleForAddNewItemSection}
            onItemChange={onGridItemChange}
            onAddNewItem={onAddNewGridItem}>
            <GridColumn width={100} cell={ServicesIcon} />
            <GridColumn
              field={'offerID'}
              title={localizationService.toLanguageString('custom.offeringId', 'Offering ID')}
              columnMenu={ColumnMenu}
              filter={'numeric'}
              editable={false}
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
              cell={DurationCell}
              filter={'numeric'}
            />
            <GridColumn
              field={'isShowOnline'}
              title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
              columnMenu={ColumnMenu}
              cell={BooleanFlagCell}
              filter={'boolean'}
            />
            <GridColumn
              field={'isConsultation'}
              title={localizationService.toLanguageString('custom.consultation', 'Consultation')}
              columnMenu={ColumnMenu}
              cell={BooleanFlagCell}
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
            <GridColumn title={localizationService.toLanguageString('custom.actions', 'Actions')} cell={ActionsControlCell} />
          </Grid>
        </div>
      </div>
    </div>
  );
};
