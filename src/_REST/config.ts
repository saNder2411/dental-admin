export const ROOT_URL = 'http://localhost:4200';

export const headers = {
  Accept: 'application/json; odata=verbose',
  'content-type': 'application/json;odata=verbose',
};

export const SP_ROOT_URL = 'https://sa-toniguy01.metroapps.online/';

export const APPOINTMENT_LIST_GUID = 'D9DCCD8B-9F3D-4330-89E3-BDA20BB04348';

export const CUSTOMER_LIST_GUID = '27F5D039-9C85-4E09-A869-45B65150829F';

export const STAFF_LIST_GUID = '7D03D3F4-87DA-4C2C-B288-3177BD0D5F44';

export const SERVICE_LIST_GUID = '88F709C0-E906-4CAF-BEE4-1C61BABC71F5';

export const APPOINTMENT_SELECT_FIELDS = `ID,Title,EventDate,EndDate,AppointmentStatus,Description,Notes,MetroRRule,MetroRecException,RecurrenceID,Duration,ServiceCharge,fAllDayEvent,FirstName,LastNameAppt,Gender,CellPhone,Email,FilterStart,FilterEnd,Modified,LookupHR01team/Id,LookupCM102customers/Id,LookupMultiBP01offerings/Id`;

export const CUSTOMER_SELECT_FIELDS = `ID,Title,FirstName,FullName,CellPhone,Email,Gender,ClientPhoto,Created,Modified,LookupMultiHR01team/Id`;

export const SERVICE_SELECT_FIELDS = `ID,OfferingsName_Edit,OfferingCatType,ShowOnline,ConsultReq,MinutesDuration,Amount,OfferingDiscount`;

export const STAFF_SELECT_FIELDS = `ID,Title,FirstName,FullName,TeamProfilePhoto,ShowOnline,Email,CellPhone,JobTitle,Department,CalendarColHex`;
