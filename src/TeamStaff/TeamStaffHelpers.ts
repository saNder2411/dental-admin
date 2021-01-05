// Types
import { QueryTeamStaffDataItem, StaffDataItem, MutationTeamStaffDataItem } from './TeamStaffTypes';

export const transformAPIData = (apiResults: QueryTeamStaffDataItem[]): StaffDataItem[] =>
  apiResults.map(({ __metadata, ...others }) => ({ ...others, TeamProfilePhotoUrl: others.TeamProfilePhoto?.Url ?? '' }));

export const transformAPIDataItem = ({ __metadata, ...others }: QueryTeamStaffDataItem): StaffDataItem => ({
  ...others,
  TeamProfilePhotoUrl: others.TeamProfilePhoto?.Url ?? '',
});

export const transformDataItemForAPI = ({
  TeamProfilePhotoUrl,
  TeamProfilePhoto,
  FullName,
  RoleSkills,
  Gender,
  ...others
}: StaffDataItem): MutationTeamStaffDataItem => {
  return {
    ...others,
    TeamProfilePhoto: TeamProfilePhoto
      ? { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl }
      : { Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl, __metadata: { type: 'SP.FieldUrlValue' } },
    FullName,
    FirstName: FullName.split(' ')[0],
    Title: FullName.split(' ').slice(-1)[0],
    __metadata: { type: 'SP.Data.MetroHR01ListItem' },
  };
};
