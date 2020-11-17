// Types
import { APITeamStaffDataItem, TeamStaffDataItem } from './TeamStaffTypes';

export const transformTeamStaffData = (apiResults: APITeamStaffDataItem[]): TeamStaffDataItem[] =>
  apiResults.map((item) => ({ ...item, TeamProfilePhotoUrl: item.TeamProfilePhoto.Url }));

export const transformTeamStaffDataItem = (apiResult: APITeamStaffDataItem): TeamStaffDataItem => ({
  ...apiResult,
  TeamProfilePhotoUrl: apiResult.TeamProfilePhoto.Url,
});

export const transformTeamStaffDataItemForAPI = ({ TeamProfilePhotoUrl, TeamProfilePhoto, ...others }: TeamStaffDataItem): APITeamStaffDataItem => ({
  ...others,
  TeamProfilePhoto: { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl },
});
