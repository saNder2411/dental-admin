export interface CustomersDataItem {
  id: number;
  teamID: string;
  lastName: string;
  firstName: string;
  gender: string;
  svcStaff: string;
  upcoming: string;
  email: string;
  mobilePhone: string;
  lastUpdate: Date;
  photo: string;
}

export interface CustomersState {
  data: CustomersDataItem[];
}
