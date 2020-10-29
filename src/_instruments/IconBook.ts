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

interface IconStyle extends CSSProperties {
  '--fa-primary-color': string;
  '--fa-secondary-color': string;
}

export enum IconName {
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
  Tooth = 'Tooth',
}

type TIconBook = {
  [key in IconName]: {
    icon: IconDefinition;
    style: IconStyle;
    statusColor: string;
  };
};

export const IconBook: TIconBook = {
  Consultation: {
    icon: faUserHeadset,
    statusColor: '#9FA91E',
    style: {
      '--fa-primary-color': '#39A9E0',
      '--fa-secondary-color': '#A51A22',
    },
  },
  Pending: {
    icon: faCalendarEdit,
    statusColor: '#DEA91A',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  Reserved: {
    icon: faCalendarPlus,
    statusColor: '#EF7E26',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  Booked: {
    icon: faCalendarCheck,
    statusColor: '#DC0E24',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  Paid: {
    icon: faBagsShopping,
    statusColor: '#39A9E0',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#9FA91E',
    },
  },
  Checking: {
    icon: faCalendarExclamation,
    statusColor: '#B55717',
    style: {
      '--fa-primary-color': '#A51A22',
      '--fa-secondary-color': '#FDD245',
    },
  },
  Cancelled: {
    icon: faCalendarTimes,
    statusColor: '#A877B2',
    style: {
      '--fa-primary-color': '#8A3F7C',
      '--fa-secondary-color': '#FDD245',
    },
  },
  Closed: {
    icon: faDoorClosed,
    statusColor: '#7F94A6',
    style: {
      '--fa-primary-color': '#8A3F7C',
      '--fa-secondary-color': '#FDD245',
    },
  },
  Unavailable: {
    icon: faUserTimes,
    statusColor: '#B2B4D9',
    style: {
      '--fa-primary-color': '#39A9E0',
      '--fa-secondary-color': '#8A3F7C',
    },
  },
  Other: {
    icon: faCalendar,
    statusColor: '#D9B2B4',
    style: {
      '--fa-primary-color': '#39A9E0',
      '--fa-secondary-color': '#B2C7D9',
    },
  },
  Tooth: {
    icon: faTooth,
    statusColor: '#17325f',
    style: {
      '--fa-primary-color': '#17325f',
      '--fa-secondary-color': '#17325f',
    },
  },
};
