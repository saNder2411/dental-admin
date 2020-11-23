// Types
import { APITeamStaffDataItem, TeamStaffDataItem } from './TeamStaffTypes';

export const transformData = (apiResults: APITeamStaffDataItem[]): TeamStaffDataItem[] =>
  apiResults.map((item) => ({ ...item, TeamProfilePhotoUrl: item.TeamProfilePhoto.Url }));

export const transformDataItem = (apiResult: APITeamStaffDataItem): TeamStaffDataItem => ({
  ...apiResult,
  TeamProfilePhotoUrl: apiResult.TeamProfilePhoto.Url,
});

export const transformDataItemForAPI = ({ TeamProfilePhotoUrl, TeamProfilePhoto, FullName, ...others }: TeamStaffDataItem): APITeamStaffDataItem => ({
  ...others,
  TeamProfilePhoto: { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl },
  FullName,
  FirstName: FullName.split(' ')[0],
  Title: FullName.split(' ').slice(-1)[0],
});
