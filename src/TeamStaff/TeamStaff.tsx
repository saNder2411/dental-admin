import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import { AvatarCell, BooleanFlagCell, ActionsControlCell } from '../_sections';
// Mock
import { TeamStaffGridData } from './TeamStaffMockData';
// Selectors
import { selectGridData, selectGridDataName, selectGridActions } from '../_sections/Grid';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';

export const TeamStaff: FC = (): JSX.Element => {
  const data = useSelector(selectGridData);
  const dataName = useSelector(selectGridDataName);
  const dispatch = useDispatch();
  const { setData } = useSelector(selectGridActions, shallowEqual);

  const localizationService = useLocalization();

  useEffect(() => {
    if (dataName === GridDataName.TeamStaff) return;

    setData(dispatch, TeamStaffGridData.slice());
  }, [dataName, setData, dispatch]);

  const hasTeamStaffData = dataName === GridDataName.TeamStaff;

  return (
    <div id="Grid" className="stylists-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={hasTeamStaffData ? data : []}>
            <GridColumn
              field={'teamID'}
              title={localizationService.toLanguageString('custom.teamID', 'Team ID')}
              columnMenu={ColumnMenu}
              width={130}
              filter={'numeric'}
            />
            <GridColumn
              field={'photo'}
              title={localizationService.toLanguageString('custom.photo', 'Photo')}
              cell={AvatarCell as CustomGridCell}
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
              cell={BooleanFlagCell as CustomGridCell}
              width={160}
              filter={'boolean'}
            />
            <GridColumn
              field={'mobilePhone'}
              title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
              columnMenu={ColumnMenu}
              filter={'numeric'}
              width={140}
            />
            <GridColumn
              field={'email'}
              title={localizationService.toLanguageString('custom.email', 'Email')}
              columnMenu={ColumnMenu}
              filter={'text'}
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
