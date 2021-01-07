// Types
import { QueryStaffDataItem, StaffDataItem, MutationStaffDataItem } from './TeamStaffTypes';

export const transformAPIData = (apiResults: QueryStaffDataItem[]): StaffDataItem[] =>
  apiResults.map(({ __metadata, ...dataItem }) => ({ ...dataItem, TeamProfilePhotoUrl: dataItem.TeamProfilePhoto?.Url ?? '' }));

export const transformAPIDataItem = ({ __metadata, ...dataItem }: QueryStaffDataItem): StaffDataItem => ({
  ...dataItem,
  TeamProfilePhotoUrl: dataItem.TeamProfilePhoto?.Url ?? '',
});

export const transformDataItemForAPI = ({
  TeamProfilePhotoUrl,
  TeamProfilePhoto,
  FullName,
  // RoleSkills,
  // Gender,
  inEdit,
  isNew,
  ...others
}: StaffDataItem): MutationStaffDataItem => {
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
