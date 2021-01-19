import AppConfig from '../../public/app-config.json';
console.log(AppConfig);

export const ROOT_URL = 'http://localhost:4200';

export const headers = {
  Accept: 'application/json; odata=verbose',
  'content-type': 'application/json;odata=verbose',
};

export const SP_ROOT_URL = 'https://sa-toniguy01.metroapps.online/';

export const GuidList = {
  Appointment: 'D9DCCD8B-9F3D-4330-89E3-BDA20BB04348',
  Customer: '27F5D039-9C85-4E09-A869-45B65150829F',
  Staff: '7D03D3F4-87DA-4C2C-B288-3177BD0D5F44',
  Service: '88F709C0-E906-4CAF-BEE4-1C61BABC71F5',
};

export const SelectFields = {
  Appointment:
    'ID,Title,EventDate,EndDate,AppointmentStatus,Description,Notes,MetroRRule,MetroRecException,RecurrenceID,Duration,ServiceCharge,fAllDayEvent,FirstName,LastNameAppt,Gender,CellPhone,Email,FilterStart,FilterEnd,Modified,LookupHR01teamId,LookupCM102customersId,LookupMultiBP01offeringsId',
  Customer: 'ID,Title,FirstName,FullName,CellPhone,Email,Gender,ClientPhoto,Created,Modified,LookupMultiHR01teamId',
  Staff: 'ID,Title,FirstName,FullName,TeamProfilePhoto,ShowOnline,Email,CellPhone,JobTitle,Department,CalendarColHex',
  Service: 'ID,OfferingsName_Edit,OfferingCatType,ShowOnline,ConsultReq,MinutesDuration,Amount,OfferingDiscount',
};

export const FilterItems = {
  Appointments: `(FilterStart ge datetime'${new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).toISOString()}') and (FilterEnd le datetime'${new Date(new Date().getFullYear(), new Date().getMonth() + 6).toISOString()}')`,
};

export const OrderBy = {
  Appointment: 'EventDate',
  Customer: 'Title',
  Staff: 'ID',
  Service: 'OfferingCatType',
};
