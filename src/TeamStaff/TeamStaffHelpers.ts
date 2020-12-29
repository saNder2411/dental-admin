// Types
import { QueryTeamStaffDataItem, TeamStaffDataItem, MutationTeamStaffDataItem } from './TeamStaffTypes';

export const transformAPIData = (apiResults: QueryTeamStaffDataItem[]): TeamStaffDataItem[] =>
  apiResults.map(({ __metadata, ...others }) => ({ ...others, TeamProfilePhotoUrl: others.TeamProfilePhoto.Url ?? '' }));

export const transformAPIDataItem = ({ __metadata, ...others }: QueryTeamStaffDataItem): TeamStaffDataItem => ({
  ...others,
  TeamProfilePhotoUrl: others.TeamProfilePhoto.Url ?? '',
});

export const transformDataItemForAPI = ({
  TeamProfilePhotoUrl,
  TeamProfilePhoto,
  FullName,
  RoleSkills,
  Gender,
  ...others
}: TeamStaffDataItem): MutationTeamStaffDataItem => {
  return {
    ...others,
    TeamProfilePhoto: { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl },
    FullName,
    FirstName: FullName.split(' ')[0],
    Title: FullName.split(' ').slice(-1)[0],
    __metadata: { type: 'SP.Data.MetroHR01ListItem' },
  };
};
