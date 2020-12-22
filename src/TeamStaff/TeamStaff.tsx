import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  GenericTextCell,
  GenericAvatarCell,
  TeamStaffFullNameCell,
  TeamStaffJobTitleCell,
  GenericRoleSkillsCell,
  GenericBooleanFlagCell,
  TeamStaffMobilePhoneCell,
  ActionsControlCell,
} from '../_sections';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
// Selectors
import { selectGridDataName } from '../_sections/Grid/GridSelectors';
// Actions
import { GridActions } from '../_sections/Grid/GridActions';
import { TeamStaffActions } from './TeamStaffActions';
// Hooks
import { useFetchDataForDomain, useSetGridData } from '../_sections/Grid/GridHooks';
import { useTeamStaffStateForDomain } from './TeamStaffHooks';

export const TeamStaff: FC = (): JSX.Element => {
  const dataName = useSelector(selectGridDataName);
  const { teamStaffData, teamStaffIsDataLoading } = useTeamStaffStateForDomain();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchDataForDomain(teamStaffData.length, TeamStaffActions, dispatch);
  useSetGridData(dataName, GridDataName.TeamStaff, teamStaffData, GridActions, dispatch);

  const hasTeamStaffData = dataName === GridDataName.TeamStaff;
  const contentTSX = hasTeamStaffData && !teamStaffIsDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid>
          <GridColumn
            field={'Id'}
            title={localizationService.toLanguageString('custom.teamID', 'Team ID')}
            columnMenu={ColumnMenu}
            editable={false}
            width={130}
            filter={'numeric'}
          />
          <GridColumn
            field={'TeamProfilePhotoUrl'}
            title={localizationService.toLanguageString('custom.photo', 'Photo')}
            cell={GenericAvatarCell as CustomGridCell}
            width={120}
          />
          <GridColumn
            field={'FullName'}
            title={localizationService.toLanguageString('custom.fullName', 'Name')}
            cell={TeamStaffFullNameCell as CustomGridCell}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'JobTitle'}
            title={localizationService.toLanguageString('custom.jobTitle', 'Job Title')}
            columnMenu={ColumnMenu}
            cell={TeamStaffJobTitleCell as CustomGridCell}
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
            field={'ShowOnline'}
            title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
            columnMenu={ColumnMenu}
            cell={GenericBooleanFlagCell as CustomGridCell}
            width={160}
            filter={'boolean'}
          />
          <GridColumn
            field={'CellPhone'}
            title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
            columnMenu={ColumnMenu}
            cell={TeamStaffMobilePhoneCell as CustomGridCell}
            filter={'text'}
            width={140}
          />
          <GridColumn
            field={'Email'}
            title={localizationService.toLanguageString('custom.email', 'Email')}
            columnMenu={ColumnMenu}
            filter={'text'}
            cell={GenericTextCell as CustomGridCell}
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
    <div className="stylists-page main-content">
      {contentTSX}
      <Loader className="mt-5" isLoading={teamStaffIsDataLoading} size={'large'} type="infinite-spinner" />
    </div>
  );
};
