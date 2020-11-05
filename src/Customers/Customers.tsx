import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import { DateCell, CustomerPhotoCell, ActionsControlCell } from '../_sections';
// Mock
import { CustomersGridData } from './CustomersMockData';
// Selectors
import { selectGridState } from '../_sections/Grid';
// Types
import { GridDataName } from '../_sections/Grid';

export const Customers: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { data, editField, setData, onItemChange, onAddNewItem, titleForAddNewItemSection, dataName } = useSelector(selectGridState);
  const localizationService = useLocalization();

  useEffect(() => {
    if (dataName === GridDataName.Customers) return;

    setData(dispatch, CustomersGridData.slice());
  }, [dataName, setData, dispatch]);

  const hasServicesData = dataName === GridDataName.Customers;

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
            <GridColumn
              field={'teamID'}
              title={localizationService.toLanguageString('custom.teamID', 'Team ID')}
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
            <GridColumn field={'photo'} title={localizationService.toLanguageString('custom.photo', 'Photo')} cell={CustomerPhotoCell} width={120} />
            <GridColumn title={localizationService.toLanguageString('custom.actions', 'Actions')} cell={ActionsControlCell} />
          </Grid>
        </div>
      </div>
    </div>
  );
};
