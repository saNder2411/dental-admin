// import AnyStylist from '../_assets/stylists/Any-Stylist-Portrait-85x85.png';
import Amelia from '../_assets/stylists/Amelia-Giroud-Portrait-85x85.png';
import GraceRobinson from '../_assets/stylists/Grace-Robinson-Portrait-85x85.png';
import ChristinaRomanov from '../_assets/stylists/Christina-Romanov-Portrait-85x85.png';
import DavidWenger from '../_assets/stylists/David-Wenger-Portrait-85x85.png';
import AlexLocatelli from '../_assets/stylists/Alex-Locatelli-Portrait-85x85.png';
import SaraKhan from '../_assets/stylists/Sara-Khan-Portrait-85x85.png';

export const employees = [
  // {
  //   teamId: 1,
  //   id: '3d2f991c-58ef-436d-912e-49496fd2065c',
  //   photo: AnyStylist,
  //   fullName: '--Team Stylist--',
  //   jobTitle: 'Various',
  //   isShowOnline: true,
  //   mobilePhone: '+89 7955 99888',
  //   email: 'any.stylist@metroapps.online',
  //   gender: 'F',
  // },
  {
    teamId: 3,
    id: '7b991e13-bef7-4f19-bd18-d5aa9d263cba',
    fullName: 'Amelia Giround',
    jobTitle: 'Art Director',
    isShowOnline: true,
    mobilePhone: '+89 7955 99888',
    email: 'amelia.giround@metroapps.online',
    photo: Amelia,
    gender: 'F',
  },
  {
    teamId: 4,
    id: 'df3dffe4-6fb4-4a9c-8512-71f7cb508180',
    photo: GraceRobinson,
    fullName: 'Grace Robinson',
    jobTitle: 'Junior Stylists',
    isShowOnline: true,
    mobilePhone: '+89 7955 99444',
    email: 'grace.robinson@metroapps.online',
    gender: 'F',
  },
  {
    teamId: 2,
    id: 'a765924f-8ffb-4186-8991-6000a6ce2652',
    photo: ChristinaRomanov,
    fullName: 'Christina Romanov',
    jobTitle: 'Senior Stylists',
    isShowOnline: true,
    mobilePhone: '+89 7955 99666',
    email: 'christine.romanov@metroapps.online',
    gender: 'F',
  },
  {
    teamId: 6,
    id: 'ab6704b8-20ed-4881-ab28-96e3d55f7792',
    photo: DavidWenger,
    fullName: 'David Wenger',
    jobTitle: 'Senior Stylists',
    isShowOnline: false,
    mobilePhone: '+89 7955 99555',
    email: 'david.wenger@metroapps.online',
    gender: 'M',
  },
  {
    teamId: 7,
    id: 'b75a42e9-db84-479c-96b0-d88109abfebb',
    photo: AlexLocatelli,
    fullName: 'Alex Locatelli',
    jobTitle: 'Stylist Director',
    isShowOnline: true,
    mobilePhone: '+89 7955 99777',
    email: 'alex.locatelli@metroapps.online',
    gender: 'M',
  },
  {
    teamId: 5,
    id: 'c8389213-a2cd-4bb8-ba99-9c29e9b70881',
    photo: SaraKhan,
    fullName: 'Sara Khan',
    jobTitle: 'Senior Stylist',
    isShowOnline: true,
    mobilePhone: '+89 7955 99333',
    email: 'sara.khan@metroapps.online',
    gender: 'F',
  },
];

export const teams = [
  {
    teamID: 1,
    teamName: 'Tiger Team',
    teamColor: '#FF6358',
  },
  {
    teamID: 2,
    teamName: 'Lemon Team',
    teamColor: '#F7C62F',
  },
  {
    teamID: 3,
    teamName: 'Organic Team',
    teamColor: '#55AB1D',
  },
  {
    teamID: 4,
    teamName: 'Ocean Team',
    teamColor: '#28B4C8',
  },
  {
    teamID: 5,
    teamName: 'Purple Team',
    teamColor: '#C828B4',
  },
  {
    teamID: 6,
    teamName: 'Lime Team',
    teamColor: '#A0FF58',
  },
  {
    teamID: 7,
    teamName: 'Sky Team',
    teamColor: '#58F4FF',
  },
];

export const ordersModelFields = {
  id: 'orderID',
  title: 'customerContactName',
  description: 'shipAddress',
  start: 'requiredDateStart',
  end: 'requiredDateEnd',
  recurrenceRule: 'recurrenceRule',
  recurrenceId: 'recurrenceID',
  recurrenceExceptions: 'recurrenceException',
};

export const orders = [
  {
    customerCompanyName: 'Richter Supermarkt',
    customerContactName: 'Michael Holz',
    orderTotal: 2490.5,
    orderDate: 1531342800000,
    requiredDate: 1533762000000,
    shippedDate: 1531602000000,
    requiredDateStart: 1533821400000,
    requiredDateEnd: 1533826800000,
    orderID: 10255,
    customerID: 'RICSU',
    employeeID: 'a765924f-8ffb-4186-8991-6000a6ce2652',
    teamID: 6,
    shipVia: 3,
    freight: 148.33,
    shipName: 'Richter Supermarkt',
    shipAddress: 'Starenweg 5',
    shipCity: 'Genève',
    shipRegion: '',
    shipPostalCode: '1204',
    shipCountry: 'Switzerland',
  },
];
