// Constants
import { PREV_WEEKS, NEXT_WEEKS } from '../_bus/Constants';
// App Configure
import AppConfig from '../../public/app-config.json';

export const ROOT_URL = 'http://localhost:4200';

export const headers = {
  Accept: 'application/json; odata=verbose',
  'content-type': 'application/json;odata=verbose',
};

export const SP_ROOT_URL = AppConfig.rootUrl;

export const GuidList = {
  Appointment: 'D9DCCD8B-9F3D-4330-89E3-BDA20BB04348',
  Customer: '27F5D039-9C85-4E09-A869-45B65150829F',
  Staff: '7D03D3F4-87DA-4C2C-B288-3177BD0D5F44',
  Service: '88F709C0-E906-4CAF-BEE4-1C61BABC71F5',
  Skills: '7381575a-eee1-4be7-9fa8-0c357a9e25ce',
  HR02RoleTasksAndDuties: '0bffdb5a-e7da-404b-93a5-c7baa53cb16f',
  HR03TeamCalendarSettings: 'ea71d929-5163-4784-bfb3-597c38d53460',
  SiteUserInfoList: 'e6c0d93c-1202-46d7-8cd4-14b341ca66fb',
};

export const SelectFields = {
  Appointment: `ID,Title,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,RecurrenceID,Duration,ServiceCharge,ExtraFees,ServiceDiscount,fAllDayEvent,FirstName,LastNameAppt,Gender,CellPhone,Email,FilterStart,FilterEnd,Modified,LookupHR01teamId,LookupCM102customersId,LookupMultiBP01offeringsId`,
  Customer: `ID,Title,FirstName,FullName,CellPhone,Email,Gender,ClientPhoto,Created,Modified,LookupMultiHR01teamId`,
  Staff: `ID,Title,FirstName,FullName,TeamProfilePhoto,ShowOnline,Email,CellPhone,JobTitle,Department,CalendarColHex,LookupMultiHR02SkillsId,WorkingDayStart01,WorkingDayEnd01,WorkingDayStart02,WorkingDayEnd02,WorkingDayStart03,WorkingDayEnd03,WorkingDayStart04,WorkingDayEnd04,WorkingDayStart05,WorkingDayEnd05,WorkingDayStart06,WorkingDayEnd06,WorkingDayStart07,WorkingDayEnd07`,
  Service: `ID,ContentTypeId,OfferingsName_Edit,OfferingCatType,ShowOnline,ConsultReq,MinutesDuration,Amount,OfferingDiscount,ImageThumbnail,LookupMultiHR02SkillsId`,
  Skills: `ID,Title`,
};

export const FilterItems = {
  Appointments: `(FilterStart ge datetime'${PREV_WEEKS.toISOString()}') and (FilterEnd le datetime'${NEXT_WEEKS.toISOString()}')`,
};

export const OrderBy = {
  Appointment: 'EventDate',
  Customer: 'Title',
  Staff: 'ID',
  Service: 'OfferingCatType',
  Skills: 'ID',
};
