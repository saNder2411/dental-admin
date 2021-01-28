// Types
import { QueryStaffDataItem, StaffDataItem, MutationStaffDataItem } from './StaffTypes';

export const transformAPIData = (apiResults: QueryStaffDataItem[]): StaffDataItem[] =>
  apiResults.map(({ __metadata, LookupMultiHR02SkillsId, ...dataItem }) => ({
    ...dataItem,
    TeamProfilePhotoUrl: dataItem.TeamProfilePhoto?.Url ?? '',
    LookupMultiHR02SkillsId: { results: LookupMultiHR02SkillsId.results },
  }));

export const transformAPIDataItem = ({ __metadata, LookupMultiHR02SkillsId, ...dataItem }: QueryStaffDataItem): StaffDataItem => ({
  ...dataItem,
  TeamProfilePhotoUrl: dataItem.TeamProfilePhoto?.Url ?? '',
  LookupMultiHR02SkillsId: { results: LookupMultiHR02SkillsId.results },
});

export const transformDataItemForAPI = ({
  TeamProfilePhotoUrl,
  TeamProfilePhoto,
  FullName,
  // Gender,
  inEdit,
  isNew,
  ...dataItem
}: StaffDataItem): MutationStaffDataItem => {
  return {
    ...dataItem,
    TeamProfilePhoto: TeamProfilePhoto
      ? { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl }
      : { Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl, __metadata: { type: 'SP.FieldUrlValue' } },
    FullName,
    FirstName: FullName.split(' ')[0],
    Title: FullName.split(' ').slice(-1)[0],
    __metadata: { type: 'SP.Data.MetroHR01ListItem' },
  };
};
