// Types
import { APITeamStaffDataItem, TeamStaffDataItem } from './TeamStaffTypes';

export const transformData = (apiResults: APITeamStaffDataItem[]): TeamStaffDataItem[] =>
  apiResults.map((item) => ({ ...item, TeamProfilePhotoUrl: item.TeamProfilePhoto.Url }));

export const transformDataItem = (apiResult: APITeamStaffDataItem): TeamStaffDataItem => ({
  ...apiResult,
  TeamProfilePhotoUrl: apiResult.TeamProfilePhoto.Url,
});

export const transformDataItemForAPI = ({ TeamProfilePhotoUrl, TeamProfilePhoto, ...others }: TeamStaffDataItem): APITeamStaffDataItem => ({
  ...others,
  TeamProfilePhoto: { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl },
});
