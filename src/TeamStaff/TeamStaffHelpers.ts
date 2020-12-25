// Types
import { APIGetResTeamStaffDataItem, TeamStaffDataItem, TeamStaffDataItemForCrtUpdActions, APIPostPutResTeamStaffDataItem } from './TeamStaffTypes';

export const transformAPIData = (apiResults: APIGetResTeamStaffDataItem[]): TeamStaffDataItem[] =>
  apiResults.map((item) => ({ ...item, TeamProfilePhotoUrl: item.TeamProfilePhoto.Url }));

export const transformAPIDataItem = (apiResult: APIPostPutResTeamStaffDataItem): TeamStaffDataItem => ({
  ...apiResult,
  TeamProfilePhotoUrl: apiResult.TeamProfilePhoto.Url,
});

export const transformDataItemForAPI = ({
  TeamProfilePhotoUrl,
  TeamProfilePhoto,
  FullName,
  RoleSkills,
  Gender,
  ...others
}: TeamStaffDataItem): TeamStaffDataItemForCrtUpdActions => {
  return {
    ...others,
    TeamProfilePhoto: { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl },
    FullName,
    FirstName: FullName.split(' ')[0],
    Title: FullName.split(' ').slice(-1)[0],
    __metadata: { type: 'SP.Data.MetroHR01ListItem' },
  };
};
