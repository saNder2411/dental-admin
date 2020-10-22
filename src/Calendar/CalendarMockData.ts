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
    teamName: 'Cacao Team',
    teamColor: '#e3834f',
  },
  {
    teamID: 7,
    teamName: 'Sky Team',
    teamColor: '#58F4FF',
  },
];

export const ordersModelFields = {
  id: 'orderID',
  title: 'title',
  description: '05-Mens Colour Tint 1/1 S3_020',
  start: 'start',
  end: 'end',
  isAllDay: 'isAllDay',
  refID: 'refID',
  mobilePhone: 'phone',
  email: 'email',
  notes: '05-Mens Colour Tint 1/1 S3_020',
};

const now = Date.now();
const hour = 3.6e6;

export const orders = [
  {
    title: 'Amelia Giround',
    start: now - hour * 2,
    end: now - hour,
    orderID: 1,
    refID: 'C.A.Female-0640',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '06-Ladies Blow Dry S1_021',
    description: '06-Ladies Blow Dry S1_021',
    employeeID: '7b991e13-bef7-4f19-bd18-d5aa9d263cba',
    teamID: 3,
  },
  {
    title: 'Grace Robinson',
    start: now,
    end: now + hour,
    orderID: 2,
    refID: 'S.Pye-0503',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '02-Mens Wash+Cut+Dry S4_007',
    employeeID: 'df3dffe4-6fb4-4a9c-8512-71f7cb508180',
    teamID: 4,
    description: '02-Mens Wash+Cut+Dry S4_007',
  },
  {
    title: 'Christina Romanov',
    start: now - hour * 24,
    end: now - hour * 23.5,
    orderID: 3,
    refID: 'A.Cea-0505',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '05-Highlights 1/1 S4_013',
    employeeID: 'a765924f-8ffb-4186-8991-6000a6ce2652',
    teamID: 2,
    description: '05-Highlights 1/1 S4_013',
  },
  {
    title: 'David Wenger',
    start: now - hour * 49,
    end: now - hour * 48,
    orderID: 4,
    refID: 'A.Switzer-0506',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '01-Ladies Wash+Cut+Dry S2_002',
    employeeID: 'ab6704b8-20ed-4881-ab28-96e3d55f7792',
    teamID: 6,
    description: '01-Ladies Wash+Cut+Dry S2_002',
  },
  {
    title: 'Christina Romanov',
    start: now + hour * 2,
    end: now + hour * 3,
    orderID: 5,
    refID: 'A.Cea-0505',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '05-Highlights 1/1 S4_013',
    employeeID: 'a765924f-8ffb-4186-8991-6000a6ce2652',
    teamID: 2,
    description: '05-Highlights 1/1 S4_013',
  },
  {
    title: 'David Wenger',
    start: now + hour * 2,
    end: now + hour * 4,
    orderID: 6,
    refID: 'A.Switzer-0506',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '01-Ladies Wash+Cut+Dry S2_002',
    employeeID: 'ab6704b8-20ed-4881-ab28-96e3d55f7792',
    teamID: 6,
    description: '01-Ladies Wash+Cut+Dry S2_002',
  },
  {
    title: 'Alex Locatelli',
    start: now + hour * 22,
    end: now + hour * 23,
    orderID: 7,
    refID: 'C.Smith-0507',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '06-Ladies Blow Dry S1_021',
    employeeID: 'b75a42e9-db84-479c-96b0-d88109abfebb',
    teamID: 7,
    description: '06-Ladies Blow Dry S1_021',
  },
  {
    title: 'Sara Khan',
    start: now + hour * 26,
    end: now + hour * 27.5,
    orderID: 8,
    refID: 'C.Smith-0507',
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '08-Balayage Natural S4_027',
    employeeID: 'c8389213-a2cd-4bb8-ba99-9c29e9b70881',
    teamID: 5,
    description: '08-Balayage Natural S4_027',
  },
].map((order) => ({
  ...order,
  // parse dates
  start: new Date(order.start),
  end: new Date(order.end),
}));