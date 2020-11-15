import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  BooleanFlagCell,
  CurrencyCell,
  DiscountCell,
  TotalPriceCell,
  ServicesIconCell,
  ReferenceCell,
  ActionsControlCell,
  DurationCell,
  MultiSelectCell,
} from '../_sections';
// Selectors
import { selectGridData, selectGridDataName, selectGridActions } from '../_sections/Grid';
import { selectServicesActions, selectServicesData } from './ServicesSelectors';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';

export const Services: FC = (): JSX.Element | null => {
  const data = useSelector(selectGridData);
  const servicesData = useSelector(selectServicesData);
  const dataName = useSelector(selectGridDataName);
  const dispatch = useDispatch();
  const { setData } = useSelector(selectGridActions, shallowEqual);
  const { fetchServicesData } = useSelector(selectServicesActions);
  const localizationService = useLocalization();

  useEffect(() => {
    if (servicesData.length > 0) return;
    fetchServicesData(dispatch);
  }, [dispatch, fetchServicesData, servicesData.length]);

  useEffect(() => {
    if (dataName !== GridDataName.Services && servicesData.length > 0) {
      setData(dispatch, servicesData);
    }
  }, [dataName, setData, dispatch, servicesData]);

  const hasServicesData = dataName === GridDataName.Services;

  return (
    <div id="Grid" className="stylists-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={hasServicesData ? data : []}>
            <GridColumn width={100} cell={ServicesIconCell as CustomGridCell} field={`OfferIconName`} title={` `} />
            <GridColumn
              field={'ID'}
              title={localizationService.toLanguageString('custom.offeringId', 'Offering ID')}
              columnMenu={ColumnMenu}
              filter={'numeric'}
              editable={false}
              width={120}
            />
            <GridColumn
              field={'OfferingsName_Edit'}
              title={localizationService.toLanguageString('custom.references', 'References')}
              columnMenu={ColumnMenu}
              cell={ReferenceCell as CustomGridCell}
              filter={'text'}
            />
            <GridColumn
              field={'OfferingCatType'}
              title={localizationService.toLanguageString('custom.category', 'Category')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'RoleSkills'}
              title={localizationService.toLanguageString('custom.skills', 'Skills')}
              columnMenu={ColumnMenu}
              cell={MultiSelectCell as CustomGridCell}
              filter={'text'}
            />
            <GridColumn
              field={'MinutesDuration'}
              title={localizationService.toLanguageString('custom.duration', 'Duration (mins)')}
              columnMenu={ColumnMenu}
              cell={DurationCell as CustomGridCell}
              filter={'numeric'}
              width={150}
            />
            <GridColumn
              field={'ShowOnline'}
              title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
              columnMenu={ColumnMenu}
              cell={BooleanFlagCell as CustomGridCell}
              width={160}
              filter={'boolean'}
            />
            <GridColumn
              field={'ConsultReq'}
              title={localizationService.toLanguageString('custom.consultation', 'Consultation')}
              columnMenu={ColumnMenu}
              cell={BooleanFlagCell as CustomGridCell}
              width={160}
              filter={'boolean'}
            />
            <GridColumn
              field={'Amount'}
              title={localizationService.toLanguageString('custom.price', 'Price')}
              columnMenu={ColumnMenu}
              width={90}
              cell={CurrencyCell as CustomGridCell}
              filter={'numeric'}
            />
            <GridColumn
              field={'OfferingDiscount'}
              title={localizationService.toLanguageString('custom.discount', 'Discount %')}
              columnMenu={ColumnMenu}
              cell={DiscountCell as CustomGridCell}
              filter={'numeric'}
              width={140}
            />
            <GridColumn
              field={'Amount'}
              title={localizationService.toLanguageString('custom.total', 'Total')}
              columnMenu={ColumnMenu}
              width={90}
              cell={TotalPriceCell as CustomGridCell}
              filter={'numeric'}
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
