export interface TeamStaffDataItem {
  id: number;
  teamID: string;
  photo: string;
  fullName: string;
  jobTitle: string;
  isShowOnline: boolean;
  mobilePhone: string;
  email: string;
}

export interface TeamStaffState {
  data: TeamStaffDataItem[];
}
