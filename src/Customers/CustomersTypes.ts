export interface CustomersDataItem {
  id: number;
  teamID: string;
  lastName: string;
  firstName: string;
  gender: 'Female' | 'Male';
  svcStaff: string;
  upcoming: string;
  email: string;
  mobilePhone: string;
  lastUpdate: Date;
  photo: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface CustomersState {
  data: CustomersDataItem[];
}
