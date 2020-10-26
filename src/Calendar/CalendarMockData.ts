// import AnyStylist from '../_assets/stylists/Any-Stylist-Portrait-85x85.png';
import AmeliaGiround from '../_assets/stylists/Amelia-Giroud-Portrait-85x85.png';
import GraceRobinson from '../_assets/stylists/Grace-Robinson-Portrait-85x85.png';
import ChristinaRomanov from '../_assets/stylists/Christina-Romanov-Portrait-85x85.png';
import DavidWenger from '../_assets/stylists/David-Wenger-Portrait-85x85.png';
import AlexLocatelli from '../_assets/stylists/Alex-Locatelli-Portrait-85x85.png';
import SaraKhan from '../_assets/stylists/Sara-Khan-Portrait-85x85.png';

export const employees = [
  {
    teamId: 1,
    id: 'AmeliaGiround',
    fullName: 'Amelia Giround',
    jobTitle: 'Art Director',
    isShowOnline: true,
    mobilePhone: '+89 7955 99888',
    email: 'amelia.giround@metroapps.online',
    photo: AmeliaGiround,
    gender: 'F',
  },
  {
    teamId: 2,
    id: 'DavidWenger',
    photo: DavidWenger,
    fullName: 'David Wenger',
    jobTitle: 'Senior Stylists',
    isShowOnline: false,
    mobilePhone: '+89 7955 99555',
    email: 'david.wenger@metroapps.online',
    gender: 'M',
  },
  {
    teamId: 3,
    id: 'ChristinaRomanov',
    photo: ChristinaRomanov,
    fullName: 'Christina Romanov',
    jobTitle: 'Senior Stylists',
    isShowOnline: true,
    mobilePhone: '+89 7955 99666',
    email: 'christine.romanov@metroapps.online',
    gender: 'F',
  },
  {
    teamId: 4,
    id: 'GraceRobinson',
    photo: GraceRobinson,
    fullName: 'Grace Robinson',
    jobTitle: 'Junior Stylists',
    isShowOnline: true,
    mobilePhone: '+89 7955 99444',
    email: 'grace.robinson@metroapps.online',
    gender: 'F',
  },

  {
    teamId: 5,
    id: 'AlexLocatelli',
    photo: AlexLocatelli,
    fullName: 'Alex Locatelli',
    jobTitle: 'Stylist Director',
    isShowOnline: true,
    mobilePhone: '+89 7955 99777',
    email: 'alex.locatelli@metroapps.online',
    gender: 'M',
  },
  {
    teamId: 6,
    id: 'SaraKhan',
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
    teamName: 'Organic Team',
    managerName: 'Amelia Giround',
    teamColor: '#55AB1D',
    photo: AmeliaGiround,
    jobTitle: 'Art Director',
    managerID: 'AmeliaGiround',
  },
  {
    teamID: 2,
    teamName: 'Tiger Team',
    managerName: 'David Wenger',
    teamColor: '#FF6358',
    photo: DavidWenger,
    jobTitle: 'Senior Stylists',
    managerID: 'DavidWenger',
  },
  {
    teamID: 3,
    teamName: 'Lemon Team',
    managerName: 'Christina Romanov',
    teamColor: '#F7C62F',
    photo: ChristinaRomanov,
    jobTitle: 'Senior Stylists',
    managerID: 'ChristinaRomanov',
  },
  {
    teamID: 4,
    teamName: 'Ocean Team',
    managerName: 'Grace Robinson',
    teamColor: '#28B4C8',
    photo: GraceRobinson,
    jobTitle: 'Junior Stylists',
    managerID: 'GraceRobinson',
  },
  {
    teamID: 5,
    teamName: 'Sky Team',
    managerName: 'Alex Locatelli',
    teamColor: '#58F4FF',
    photo: AlexLocatelli,
    jobTitle: 'Stylist Director',
    managerID: 'AlexLocatelli',
  },
  {
    teamID: 6,
    teamName: 'Purple Team',
    managerName: 'Sara Khan',
    teamColor: '#C828B4',
    photo: SaraKhan,
    jobTitle: 'Senior Stylist',
    managerID: 'SaraKhan',
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

enum OrderStatus {
  Consultation = 'Consultation',
  Pending = 'Pending',
  Reserved = 'Reserved',
  Booked = 'Booked',
  Paid = 'Paid',
  Checking = 'Checking',
  Cancelled = 'Cancelled',
  Closed = 'Closed',
  Unavailable = 'Unavailable',
  Other = 'Other',
}

interface Order {
  title: string;
  start: Date;
  end: Date;
  orderID: number;
  refID: string;
  status: OrderStatus;
  mobilePhone: string;
  email: string;
  notes: string;
  description: string;
  employeeID: string;
  teamID: number;
}

export const orders: Order[] = [
  {
    title: 'Amelia Giround',
    start: now - hour * 2,
    end: now - hour,
    orderID: 1,
    refID: 'C.A.Female-0640',
    status: OrderStatus.Consultation,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '06-Ladies Blow Dry S1_021',
    description: '06-Ladies Blow Dry S1_021',
    employeeID: 'AmeliaGiround',
    teamID: 1,
  },
  {
    title: 'Grace Robinson',
    start: now,
    end: now + hour,
    orderID: 2,
    refID: 'S.Pye-0503',
    status: OrderStatus.Pending,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '02-Mens Wash+Cut+Dry S4_007',
    employeeID: 'GraceRobinson',
    teamID: 4,
    description: '02-Mens Wash+Cut+Dry S4_007',
  },
  {
    title: 'Christina Romanov',
    start: now - hour * 4,
    end: now - hour * 1,
    orderID: 3,
    refID: 'A.Cea-0505',
    status: OrderStatus.Reserved,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '05-Highlights 1/1 S4_013',
    employeeID: 'ChristinaRomanov',
    teamID: 3,
    description: '05-Highlights 1/1 S4_013',
  },
  {
    title: 'David Wenger',
    start: now - hour * 3,
    end: now - hour * 1,
    orderID: 4,
    refID: 'A.Switzer-0506',
    status: OrderStatus.Booked,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '01-Ladies Wash+Cut+Dry S2_002',
    employeeID: 'DavidWenger',
    teamID: 2,
    description: '01-Ladies Wash+Cut+Dry S2_002',
  },
  {
    title: 'Christina Romanov',
    start: now + hour * 2,
    end: now + hour * 3,
    orderID: 5,
    refID: 'A.Cea-0505',
    status: OrderStatus.Paid,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '05-Highlights 1/1 S4_013',
    employeeID: 'ChristinaRomanov',
    teamID: 3,
    description: '05-Highlights 1/1 S4_013',
  },
  {
    title: 'David Wenger',
    start: now + hour * 2,
    end: now + hour * 4,
    orderID: 6,
    refID: 'A.Switzer-0506',
    status: OrderStatus.Checking,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '01-Ladies Wash+Cut+Dry S2_002',
    employeeID: 'DavidWenger',
    teamID: 2,
    description: '01-Ladies Wash+Cut+Dry S2_002',
  },
  {
    title: 'Alex Locatelli',
    start: now + hour,
    end: now + hour * 2,
    orderID: 7,
    refID: 'C.Smith-0507',
    status: OrderStatus.Cancelled,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '06-Ladies Blow Dry S1_021',
    employeeID: 'AlexLocatelli',
    teamID: 5,
    description: '06-Ladies Blow Dry S1_021',
  },
  {
    title: 'Sara Khan',
    start: now - hour * 2,
    end: now,
    orderID: 8,
    refID: 'C.Smith-0507',
    status: OrderStatus.Closed,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '08-Balayage Natural S4_027',
    employeeID: 'SaraKhan',
    teamID: 6,
    description: '08-Balayage Natural S4_027',
  },
  {
    title: 'Sara Khan',
    start: now + hour * 2,
    end: now + hour * 3,
    orderID: 9,
    refID: 'C.Smith-0507',
    status: OrderStatus.Unavailable,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '08-Balayage Natural S4_027',
    employeeID: 'SaraKhan',
    teamID: 6,
    description: '08-Balayage Natural S4_027',
  },
  {
    title: 'Sara Khan',
    start: now - hour * 2,
    end: now - hour * 3.5,
    orderID: 10,
    refID: 'C.Smith-0507',
    status: OrderStatus.Other,
    mobilePhone: 'Phone',
    email: 'Email',
    notes: '08-Balayage Natural S4_027',
    employeeID: 'SaraKhan',
    teamID: 6,
    description: '08-Balayage Natural S4_027',
  },
].map((order) => ({
  ...order,
  // parse dates
  start: new Date(order.start),
  end: new Date(order.end),
}));
