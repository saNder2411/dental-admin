import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu } from '../_sections';
import {
  StaffTextCell,
  StaffAvatarCell,
  StaffFullNameCell,
  StaffJobTitleCell,
  StaffRoleSkillsCell,
  StaffBooleanFlagCell,
  StaffMobilePhoneCell,
  StaffActionsControlCell,
} from '../_sections';
import { Loader } from '../_components';
// Types
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
import { EntitiesMap } from '../_sections/Grid/GridTypes';
// Hooks
import { useSelectStaffData, useFetchStaffData } from './StaffHooks';

export const Staff: FC = (): JSX.Element => {
  const { staffData, isDataLoading } = useSelectStaffData();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchStaffData(staffData.length, dispatch);

  const contentTSX = !isDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid data={staffData} entityName={EntitiesMap.Staff} labelNewItemBtn="New Staff">
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
            cell={StaffAvatarCell as CustomGridCell}
            width={120}
          />
          <GridColumn
            field={'FullName'}
            title={localizationService.toLanguageString('custom.fullName', 'Name')}
            cell={StaffFullNameCell as CustomGridCell}
            columnMenu={ColumnMenu}
            filter={'text'}
          />
          <GridColumn
            field={'JobTitle'}
            title={localizationService.toLanguageString('custom.jobTitle', 'Job Title')}
            columnMenu={ColumnMenu}
            cell={StaffJobTitleCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'RoleSkills'}
            title={localizationService.toLanguageString('custom.skills', 'Skills')}
            columnMenu={ColumnMenu}
            cell={StaffRoleSkillsCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'ShowOnline'}
            title={localizationService.toLanguageString('custom.showOnline', 'Show Online')}
            columnMenu={ColumnMenu}
            cell={StaffBooleanFlagCell as CustomGridCell}
            width={160}
            filter={'boolean'}
          />
          <GridColumn
            field={'CellPhone'}
            title={localizationService.toLanguageString('custom.phone', 'Mobile Phone')}
            columnMenu={ColumnMenu}
            cell={StaffMobilePhoneCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Email'}
            title={localizationService.toLanguageString('custom.email', 'Email')}
            columnMenu={ColumnMenu}
            filter={'text'}
            cell={StaffTextCell as CustomGridCell}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.actions', 'Actions')}
            cell={StaffActionsControlCell as CustomGridCell}
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
