export interface CustomersDataItem {
  ID: number;
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

export type CustomersDataItemKeys = keyof CustomersDataItem;

export type CustomersDataItemValues = CustomersDataItem[CustomersDataItemKeys];

export interface CustomersState {
  data: CustomersDataItem[];
}
