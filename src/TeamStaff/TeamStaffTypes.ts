export interface TeamStaffDataItem {
  id: number;
  teamID: number;
  photo: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  isShowOnline: boolean;
  mobilePhone: string;
  email: string;
  gender: 'Male' | 'Female';
  inEdit?: boolean;
  isNew?: boolean;
}

export interface TeamStaffTeamData {
  teamID: number;
  teamName: string;
  managerName: string;
  teamColor: string;
  photo: string;
  jobTitle: string;
  managerID: number;
}

export interface TeamStaffState {
  data: TeamStaffDataItem[];
}
