export const ROOT_URL = 'http://localhost:4200';

export const headers = {
  Accept: 'application/json; odata=verbose',
  'content-type': 'application/json;odata=verbose',
};

export const SP_ROOT_URL = 'https://sa-toniguy01.metroapps.online/';

export const GUID_APPOINTMENT_LIST = 'D9DCCD8B-9F3D-4330-89E3-BDA20BB04348';

export const GUID_CUSTOMER_LIST = '27F5D039-9C85-4E09-A869-45B65150829F';

export const GUID_STAFF_LIST = '7D03D3F4-87DA-4C2C-B288-3177BD0D5F44';

export const GUID_SERVICE_LIST = '88F709C0-E906-4CAF-BEE4-1C61BABC71F5';

export const APPOINTMENT_SELECT_FIELDS = `ID,Title,EventDate,EndDate,AppointmentStatus,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,ServiceCharge,LookupHR01team/Id,LookupCM102customers/Id,LookupMultiBP01offerings/Id,fAllDayEvent,FirstName,LastNameAppt,Gender,CellPhone,Email,FilterStart,FilterEnd,Modified`;

export const CUSTOMER_SELECT_FIELDS = `ID,Title,FirstName,FullName,CellPhone,Email,Gender,ClientPhoto,Created,Modified,LookupMultiHR01team/Id`;

export const SERVICE_SELECT_FIELDS = `ID,OfferingsName_Edit,OfferingCatType,ShowOnline,ConsultReq,MinutesDuration,Amount,OfferingDiscount`;

export const STAFF_SELECT_FIELDS = `ID,Title,FirstName,FullName,TeamProfilePhoto,ShowOnline,Email,CellPhone,JobTitle,Department,CalendarColHex`;
