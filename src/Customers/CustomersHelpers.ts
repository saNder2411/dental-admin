// Types
import { QueryCustomerDataItem, CustomerDataItem, MutationCustomerDataItem } from './CustomersTypes';

export const transformAPIData = (apiResults: QueryCustomerDataItem[]): CustomerDataItem[] =>
  apiResults.map(({ __metadata, LookupMultiHR01teamId, ...dataItem }) => ({
    ...dataItem,
    ClientPhotoUrl: dataItem.ClientPhoto?.Url ?? '',
    LookupMultiHR01teamId: { results: LookupMultiHR01teamId.results },
  }));

export const transformAPIDataItem = ({ __metadata, LookupMultiHR01teamId, ...dataItem }: QueryCustomerDataItem): CustomerDataItem => ({
  ...dataItem,
  ClientPhotoUrl: dataItem.ClientPhoto?.Url ?? '',
  LookupMultiHR01teamId: { results: LookupMultiHR01teamId.results },
});

export const transformDataItemForAPI = ({
  ClientPhoto,
  ClientPhotoUrl,
  // SvcStaff,
  // Upcoming,
  inEdit,
  isNew,
  ...dataItem
}: CustomerDataItem): MutationCustomerDataItem => ({
  ...dataItem,
  ClientPhoto: ClientPhoto
    ? { ...ClientPhoto, Url: ClientPhotoUrl }
    : {
        Description: ClientPhotoUrl,
        Url: ClientPhotoUrl,
        __metadata: { type: 'SP.FieldUrlValue' },
      },
  FullName: `${dataItem.FirstName} ${dataItem.Title}`,
  __metadata: { type: 'SP.Data.MetroCM102ListItem' },
});

export const response = {
  d: {
    __metadata: {
      id: "Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)",
      uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)",
      etag: '"1"',
      type: 'SP.Data.MetroCM102ListItem',
    },
    FirstUniqueAncestorSecurableObject: {
      __deferred: {
        uri:
          "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/FirstUniqueAncestorSecurableObject",
      },
    },
    RoleAssignments: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/RoleAssignments",
      },
    },
    AttachmentFiles: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/AttachmentFiles",
      },
    },
    ContentType: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/ContentType" },
    },
    FieldValuesAsHtml: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/FieldValuesAsHtml",
      },
    },
    FieldValuesAsText: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/FieldValuesAsText",
      },
    },
    FieldValuesForEdit: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/FieldValuesForEdit",
      },
    },
    File: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/File" },
    },
    Folder: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/Folder" },
    },
    ParentList: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'27f5d039-9c85-4e09-a869-45b65150829f')/Items(1272)/ParentList" },
    },
    FileSystemObjectType: 0,
    Id: 1272,
    ContentTypeId: '0x01060070187AA6CE474CF08320C8E236AD0BBB04002FCE7187EC48ED4A815826D62D201731',
    Title: null,
    FirstName: null,
    FullName: null,
    CellPhone: '+(123) 456-78-95',
    Email: null,
    Company: null,
    CustomerStatus: null,
    CustomerDiscount: null,
    Gender: '(1) Female',
    AgeGroup: null,
    LoyaltyPoints: null,
    NewCustomer: false,
    SMSAlertsOn: false,
    VoiceAlertsOn: false,
    TrackingComments: null,
    JobTitle: null,
    WorkPhone: null,
    HomePhone: null,
    Home2Number: null,
    HomeAddressStreet: null,
    HomeAddressCity: null,
    HomeAddressStateOrProvince: null,
    HomeAddressCountry: null,
    HomeAddressPostalCode: null,
    WorkFax: null,
    WorkAddress: null,
    WorkCity: null,
    WorkState: null,
    WorkZip: null,
    WorkCountry: null,
    WebPage: null,
    Comments: null,
    OrdersEst: null,
    OrdersAct: null,
    InvoiceCurrency: null,
    OrderValueAverage: null,
    OrganizationalIDNumber: null,
    AssignedToId: null,
    UserField1: null,
    UserField2: null,
    UserField3: null,
    UserField4: null,
    ClientPhoto: null,
    HomeFaxNumber: null,
    LookupBP01orgId: null,
    Patch_x0020_Test: null,
    LookupMultiHR01teamId: { __metadata: { type: 'Collection(Edm.Int32)' }, results: [] },
    LookupMultiHR03eventsId: { __metadata: { type: 'Collection(Edm.Int32)' }, results: [] },
    ID: 1272,
    Modified: '2020-12-25T15:40:57Z',
    Created: '2020-12-25T15:40:57Z',
    AuthorId: 18,
    EditorId: 18,
    OData__UIVersionString: '1.0',
    Attachments: false,
    GUID: 'b59b0e93-367c-4776-a142-0cf7db004391',
  },
};
