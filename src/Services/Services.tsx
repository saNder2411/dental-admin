import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  ServicesIconCell,
  GenericTextCell,
  GenericReferenceCell,
  GenericRoleSkillsCell,
  ServicesDurationCell,
  GenericBooleanFlagCell,
  GenericCurrencyCell,
  ServicesDiscountCell,
  ServicesTotalPriceCell,
  ActionsControlCell,
} from '../_sections/Grid/GridComponents';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';
// Hooks
import { useGridStateForDomain, useFetchDataForDomain, useSetGridData } from '../_sections/Grid/GridHooks';
import { useServicesStateForDomain } from './ServicesHooks';

export const Services: FC = (): JSX.Element => {
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
          <GridColumn width={100} cell={ServicesIconCell as CustomGridCell} field={`OfferingIconName`} title={` `} />
          <GridColumn
            field={'ID'}
            title={localizationService.toLanguageString('custom.offeringId', 'Offering ID')}
            columnMenu={ColumnMenu}
            cell={GenericTextCell as CustomGridCell}
            filter={'text'}
            editable={false}
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
            cell={GenericTextCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'RoleSkills'}
            title={localizationService.toLanguageString('custom.skills', 'Skills')}
            columnMenu={ColumnMenu}
            cell={GenericRoleSkillsCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'MinutesDuration'}
            title={localizationService.toLanguageString('custom.duration', 'Duration (mins)')}
            columnMenu={ColumnMenu}
            cell={ServicesDurationCell as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            field={'ShowOnline'}
            title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
            columnMenu={ColumnMenu}
            cell={GenericBooleanFlagCell as CustomGridCell}
            filter={'boolean'}
          />
          <GridColumn
            field={'ConsultReq'}
            title={localizationService.toLanguageString('custom.consultation', 'Consultation')}
            columnMenu={ColumnMenu}
            cell={GenericBooleanFlagCell as CustomGridCell}
            filter={'boolean'}
          />
          <GridColumn
            field={'Amount'}
            title={localizationService.toLanguageString('custom.price', 'Price')}
            columnMenu={ColumnMenu}
            cell={GenericCurrencyCell as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            field={'OfferingDiscount'}
            title={localizationService.toLanguageString('custom.discount', 'Discount %')}
            columnMenu={ColumnMenu}
            cell={ServicesDiscountCell as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            field={'Amount'}
            title={localizationService.toLanguageString('custom.total', 'Total')}
            columnMenu={ColumnMenu}
            cell={ServicesTotalPriceCell as CustomGridCell}
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
  );

  return (
    <div id="Grid" className="stylists-page main-content">
      {contentTSX}
      <Loader className="mt-5" isLoading={servicesIsDataLoading} size={'large'} type="infinite-spinner" />
    </div>
  );
};
