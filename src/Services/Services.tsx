import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  BooleanFlagCell,
  GenericCurrencyCell,
  DiscountCell,
  TotalPriceCell,
  ServicesIconCell,
  GenericReferenceCell,
  ActionsControlCell,
  DurationCell,
  RoleSkillsCell,
} from '../_sections/Grid/GridComponents';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';
// Hooks
import { useGridStateForDomain, useFetchDataForDomain, useSetGridData } from '../_sections/Grid/GridHooks';
import { useServicesStateForDomain } from './ServicesHooks';

export const Services: FC = (): JSX.Element | null => {
  const { data, dataName, GridActions } = useGridStateForDomain();
  const { servicesData, servicesIsDataLoading, ServicesActions } = useServicesStateForDomain();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchDataForDomain(servicesData.length, ServicesActions, dispatch);
  useSetGridData(dataName, GridDataName.Services, servicesData, GridActions, dispatch);

  const hasServicesData = dataName === GridDataName.Services;
  const contentTSX = hasServicesData && !servicesIsDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid data={data}>
          <GridColumn width={100} cell={ServicesIconCell as CustomGridCell} field={`OfferIconName`} title={` `} />
          <GridColumn
            field={'ID'}
            title={localizationService.toLanguageString('custom.offeringId', 'Offering ID')}
            columnMenu={ColumnMenu}
            filter={'numeric'}
            editable={false}
            // width={120}
          />
          <GridColumn
            field={'OfferingsName_Edit'}
            title={localizationService.toLanguageString('custom.references', 'References')}
            columnMenu={ColumnMenu}
            cell={GenericReferenceCell as CustomGridCell}
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
            cell={RoleSkillsCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'MinutesDuration'}
            title={localizationService.toLanguageString('custom.duration', 'Duration (mins)')}
            columnMenu={ColumnMenu}
            cell={DurationCell as CustomGridCell}
            filter={'numeric'}
            // width={150}
          />
          <GridColumn
            field={'ShowOnline'}
            title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
            columnMenu={ColumnMenu}
            cell={BooleanFlagCell as CustomGridCell}
            // width={160}
            filter={'boolean'}
          />
          <GridColumn
            field={'ConsultReq'}
            title={localizationService.toLanguageString('custom.consultation', 'Consultation')}
            columnMenu={ColumnMenu}
            cell={BooleanFlagCell as CustomGridCell}
            // width={160}
            filter={'boolean'}
          />
          <GridColumn
            field={'Amount'}
            title={localizationService.toLanguageString('custom.price', 'Price')}
            columnMenu={ColumnMenu}
            // width={90}
            cell={GenericCurrencyCell as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            field={'OfferingDiscount'}
            title={localizationService.toLanguageString('custom.discount', 'Discount %')}
            columnMenu={ColumnMenu}
            cell={DiscountCell as CustomGridCell}
            filter={'numeric'}
            // width={100}
          />
          <GridColumn
            field={'Amount'}
            title={localizationService.toLanguageString('custom.total', 'Total')}
            columnMenu={ColumnMenu}
            // width={90}
            cell={TotalPriceCell as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.actions', 'Actions')}
            cell={ActionsControlCell as CustomGridCell}
            // width={140}
          />
        </Grid>
      </div>
    </div>
  );

  return (
    <div id="Grid" className="stylists-page main-content">
      {contentTSX}
      <Loader className="mt-5" isLoading={servicesIsDataLoading} size={'large'} type="infinite-spinner" />
    </div>
  );
};
