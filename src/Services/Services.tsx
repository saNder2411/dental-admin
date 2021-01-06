import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  ServicesIconCell,
  GenericReferenceCell,
  ServicesCategoryCell,
  GenericRoleSkillsCell,
  ServicesDurationCell,
  GenericBooleanFlagCell,
  GenericCurrencyCell,
  ServicesDiscountCell,
  ServicesTotalPriceCell,
  ServicesActionsControlCell,
} from '../_sections';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
// Selectors
import { selectDataName } from '../_sections/Grid/GridSelectors';
// Hooks
import { useSetGridData } from '../_sections/Grid/GridHooks';
import { useSelectServicesData, useFetchServicesData } from './ServicesHooks';

export const Services: FC = (): JSX.Element => {
  const dataName = useSelector(selectDataName);
  const { servicesData, isDataLoading } = useSelectServicesData();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchServicesData(servicesData.length, dispatch);
  useSetGridData(dataName, GridDataName.Services, servicesData, dispatch);

  const hasServicesData = dataName === GridDataName.Services;
  const contentTSX = hasServicesData && !isDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid>
          <GridColumn width={100} cell={ServicesIconCell as CustomGridCell} field={`OfferingIconName`} title={` `} />
          <GridColumn
            field={'Id'}
            title={localizationService.toLanguageString('custom.offeringId', 'Offering ID')}
            columnMenu={ColumnMenu}
            filter={'text'}
            editable={false}
            width={120}
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
            cell={ServicesCategoryCell as CustomGridCell}
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
            cell={ServicesActionsControlCell as CustomGridCell}
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
