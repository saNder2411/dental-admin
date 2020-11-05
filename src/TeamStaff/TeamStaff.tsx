import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import { PhotoCell, BooleanFlagCell, ActionsControlCell } from '../_sections';
// Mock
import { TeamStaffGridData } from './TeamStaffMockData';
// Selectors
import { selectGridState } from '../_sections/Grid';
// Types
import { GridDataName } from '../_sections/Grid';

export const TeamStaff: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { data, editField, setData, onItemChange, onAddNewItem, titleForAddNewItemSection, dataName } = useSelector(selectGridState);
  const localizationService = useLocalization();

  useEffect(() => {
    if (dataName === GridDataName.TeamStaff) return;

    setData(dispatch, TeamStaffGridData.slice());
  }, [dataName, setData, dispatch]);

  const hasServicesData = dataName === GridDataName.TeamStaff;

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
            <GridColumn field={'photo'} title={localizationService.toLanguageString('custom.photo', 'Photo')} cell={PhotoCell} width={120} />
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
              cell={BooleanFlagCell}
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
            <GridColumn title={localizationService.toLanguageString('custom.actions', 'Actions')} cell={ActionsControlCell} />
          </Grid>
        </div>
      </div>
    </div>
  );
};
