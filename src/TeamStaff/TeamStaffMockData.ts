// import AnyStylist from '../_assets/stylists/Any-Stylist-Portrait-85x85.png';
import Amelia from '../_assets/stylists/Amelia-Giroud-Portrait-85x85.png';
import GraceRobinson from '../_assets/stylists/Grace-Robinson-Portrait-85x85.png';
import ChristinaRomanov from '../_assets/stylists/Christina-Romanov-Portrait-85x85.png';
import DavidWenger from '../_assets/stylists/David-Wenger-Portrait-85x85.png';
import AlexLocatelli from '../_assets/stylists/Alex-Locatelli-Portrait-85x85.png';
import SaraKhan from '../_assets/stylists/Sara-Khan-Portrait-85x85.png';

export const TeamStaffGridData = [
  // {
  //   id: 1,
  //   teamID: '1',
  //   photo: AnyStylist,
  //   firstName: '--Team Stylist--',
  //   lastName: '--Team Stylist--',
  //   fullName: '--Team Stylist--',
  //   jobTitle: 'Various',
  //   isShowOnline: true,
  //   mobilePhone: '+89 7955 99888',
  //   email: 'any.stylist@metroapps.online',
  // },
  {
    id: 1,
    teamID: 1,
    photo: Amelia,
    firstName: 'Amelia',
    lastName: 'Giround',
    fullName: 'Amelia Giround',
    jobTitle: 'Art Director',
    isShowOnline: true,
    mobilePhone: '+89 7955 99888',
    email: 'amelia.giround@metroapps.online',
    gender: 'F',
  },
  {
    id: 2,
    teamID: 4,
    photo: GraceRobinson,
    firstName: 'Grace',
    lastName: 'Robinson',
    fullName: 'Grace Robinson',
    jobTitle: 'Junior Stylists',
    isShowOnline: true,
    mobilePhone: '+89 7955 99444',
    email: 'grace.robinson@metroapps.online',
    gender: 'F',
  },
  {
    id: 3,
    teamID: 3,
    photo: ChristinaRomanov,
    firstName: 'Christina',
    lastName: 'Romanova',
    fullName: 'Christina Romanova',
    jobTitle: 'Senior Stylists',
    isShowOnline: true,
    mobilePhone: '+89 7955 99666',
    email: 'christine.romanov@metroapps.online',
    gender: 'F',
  },
  {
    id: 4,
    teamID: 2,
    photo: DavidWenger,
    firstName: 'David',
    lastName: 'Wenger',
    fullName: 'David Wenger',
    jobTitle: 'Senior Stylists',
    isShowOnline: false,
    mobilePhone: '+89 7955 99555',
    email: 'david.wenger@metroapps.online',
    gender: 'M',
  },
  {
    id: 5,
    teamID: 5,
    photo: AlexLocatelli,
    firstName: 'Alex',
    lastName: 'Locatelli',
    fullName: 'Alex Locatelli',
    jobTitle: 'Stylist Director',
    isShowOnline: true,
    mobilePhone: '+89 7955 99777',
    email: 'alex.locatelli@metroapps.online',
    gender: 'M',
  },
  {
    id: 6,
    teamID: 6,
    photo: SaraKhan,
    firstName: 'Sara',
    lastName: 'Khan',
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
    photo: Amelia,
    jobTitle: 'Art Director',
    managerID: 1,
  },
  {
    teamID: 2,
    teamName: 'Tiger Team',
    managerName: 'David Wenger',
    teamColor: '#FF6358',
    photo: DavidWenger,
    jobTitle: 'Senior Stylists',
    managerID: 4,
  },
  {
    teamID: 3,
    teamName: 'Lemon Team',
    managerName: 'Christina Romanov',
    teamColor: '#F7C62F',
    photo: ChristinaRomanov,
    jobTitle: 'Senior Stylists',
    managerID: 3,
  },
  {
    teamID: 4,
    teamName: 'Ocean Team',
    managerName: 'Grace Robinson',
    teamColor: '#28B4C8',
    photo: GraceRobinson,
    jobTitle: 'Junior Stylists',
    managerID: 2,
  },
  {
    teamID: 5,
    teamName: 'Sky Team',
    managerName: 'Alex Locatelli',
    teamColor: '#58F4FF',
    photo: AlexLocatelli,
    jobTitle: 'Stylist Director',
    managerID: 5,
  },
  {
    teamID: 6,
    teamName: 'Purple Team',
    managerName: 'Sara Khan',
    teamColor: '#C828B4',
    photo: SaraKhan,
    jobTitle: 'Senior Stylist',
    managerID: 6,
  },
];