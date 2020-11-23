// Types
import { APITeamStaffDataItem, TeamStaffDataItem } from './TeamStaffTypes';

export const transformData = (apiResults: APITeamStaffDataItem[]): TeamStaffDataItem[] =>
  apiResults.map((item) => ({ ...item, TeamProfilePhotoUrl: item.TeamProfilePhoto.Url }));

export const transformDataItem = (apiResult: APITeamStaffDataItem): TeamStaffDataItem => ({
  ...apiResult,
  TeamProfilePhotoUrl: apiResult.TeamProfilePhoto.Url,
});

export const transformDataItemForAPI = ({
  TeamProfilePhotoUrl,
  TeamProfilePhoto,
  FullName,
  ID,
  __metadata,
  ...others
}: TeamStaffDataItem): APITeamStaffDataItem => {
  const startID = __metadata.id.lastIndexOf(`(`) + 1;
  const newID = `${__metadata.id.slice(0, startID)}${ID})`;
  return {
    ...others,
    ID,
    Id: ID,
    id: ID,
    __metadata: { ...__metadata, id: newID },
    TeamProfilePhoto: { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl },
    FullName,
    FirstName: FullName.split(' ')[0],
    Title: FullName.split(' ').slice(-1)[0],
  };
};
