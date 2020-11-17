export interface CustomersDataItem {
  ID: number;
  teamID: string;
  lastName: string;
  firstName: string;
  Gender: 'Female' | 'Male';
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
