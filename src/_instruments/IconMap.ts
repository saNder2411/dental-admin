import { CSSProperties } from 'react';
import {
  IconDefinition,
  faUserHeadset,
  faCalendarEdit,
  faCalendarPlus,
  faCalendarCheck,
  faBagsShopping,
  faCalendarExclamation,
  faCalendarTimes,
  faDoorClosed,
  faUserTimes,
  faCalendar,
} from '@fortawesome/pro-duotone-svg-icons';
import { faTooth } from '@fortawesome/pro-regular-svg-icons';
// Types
import { StatusNames } from '../_bus/_Appointments/AppointmentsTypes';

interface IconStyle extends CSSProperties {
  '--fa-primary-color': string;
  '--fa-secondary-color': string;
}

type IconMapType = {
  [key in StatusNames]: {
    icon: IconDefinition;
    style: IconStyle;
    statusColor: string;
  };
};

export const IconMap: IconMapType = {
  '(1) Consultation': {
    icon: faUserHeadset,
    statusColor: '#9FA91E',
    style: {
      '--fa-primary-color': '#39A9E0',
      '--fa-secondary-color': '#A51A22',
    },
  },
  '(2) Pending': {
    icon: faCalendarEdit,
    statusColor: '#DEA91A',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  '(3) Reserved': {
    icon: faCalendarPlus,
    statusColor: '#EF7E26',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  '(4) Booked': {
    icon: faCalendarCheck,
    statusColor: '#DC0E24',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  '(5) Paid': {
    icon: faBagsShopping,
    statusColor: '#39A9E0',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#9FA91E',
    },
  },
  '(6) Checking': {
    icon: faCalendarExclamation,
    statusColor: '#B55717',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  '(7) Cancelled': {
    icon: faCalendarTimes,
    statusColor: '#A877B2',
    style: {
      '--fa-primary-color': '#8A3F7C',
      '--fa-secondary-color': '#FDD245',
    },
  },
  '(8) Closed': {
    icon: faDoorClosed,
    statusColor: '#7F94A6',
    style: {
      '--fa-primary-color': '#8A3F7C',
      '--fa-secondary-color': '#FDD245',
    },
  },
  '(9) Unavailable': {
    icon: faUserTimes,
    statusColor: '#B2B4D9',
    style: {
      '--fa-primary-color': '#39A9E0',
      '--fa-secondary-color': '#8A3F7C',
    },
  },
  '(10) Other': {
    icon: faCalendar,
    statusColor: '#D9B2B4',
    style: {
      '--fa-primary-color': '#39A9E0',
      '--fa-secondary-color': '#B2C7D9',
    },
  },
  '(11) Tooth': {
    icon: faTooth,
    statusColor: '#17325f',
    style: {
      '--fa-primary-color': '#17325f',
      '--fa-secondary-color': '#17325f',
    },
  },
};
