import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  ServicesIconCell,
  ServicesReferenceCell,
  ServicesCategoryCell,
  ServicesSkillsCell,
  ServicesDurationCell,
  ServicesBooleanFlagCell,
  ServicesCurrencyCell,
  ServicesDiscountCell,
  ServicesTotalPriceCell,
  ServicesActionsControlCell,
} from '../_sections';
import { Loader } from '../_components';
// Types
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
import { EntitiesKeys } from '../_bus/Entities/EntitiesTypes';
// Action Creators
import { fetchServicesDataInitAsyncAC } from '../_bus/Entities/EntitiesAC';
// Selectors
import { selectOriginalServicesData, selectOriginalSkillsDataLength } from '../_bus/Entities/EntitiesSelectors';
// Hooks
import { useFetchData } from '../_bus/Hooks/useFetchData';

export const Services: FC = (): JSX.Element => {
  const localizationService = useLocalization();
  const servicesData = useSelector(selectOriginalServicesData);
  const skillsDataLength = useSelector(selectOriginalSkillsDataLength);
  const hasAllData = servicesData.length > 0 && skillsDataLength > 0;
  const initAsyncAC = useCallback(() => fetchServicesDataInitAsyncAC({ servicesDataLength: servicesData.length, skillsDataLength }), [
    servicesData.length,
    skillsDataLength,
  ]);
  const isDataLoading = useFetchData(hasAllData, initAsyncAC);

  const contentTSX = hasAllData && !isDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid data={servicesData} entityName={EntitiesKeys.Services} labelNewItemBtn="New Service">
          <GridColumn width={100} cell={ServicesIconCell as CustomGridCell} field={`ImageThumbnail`} />
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
            cell={ServicesReferenceCell as CustomGridCell}
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
            field={'LookupMultiHR02SkillsId'}
            title={localizationService.toLanguageString('custom.skills', 'Skills')}
            columnMenu={ColumnMenu}
            cell={ServicesSkillsCell as CustomGridCell}
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
            cell={ServicesBooleanFlagCell as CustomGridCell}
            filter={'boolean'}
          />
          <GridColumn
            field={'ConsultReq'}
            title={localizationService.toLanguageString('custom.consultation', 'Consultation')}
            columnMenu={ColumnMenu}
            cell={ServicesBooleanFlagCell as CustomGridCell}
            filter={'boolean'}
          />
          <GridColumn
            field={'Amount'}
            title={localizationService.toLanguageString('custom.price', 'Price')}
            columnMenu={ColumnMenu}
            cell={ServicesCurrencyCell as CustomGridCell}
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
