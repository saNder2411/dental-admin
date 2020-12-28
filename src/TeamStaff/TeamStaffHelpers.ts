// Types
import { QueryTeamStaffDataItem, TeamStaffDataItem, MutationTeamStaffDataItem } from './TeamStaffTypes';

export const transformAPIData = (apiResults: QueryTeamStaffDataItem[]): TeamStaffDataItem[] =>
  apiResults.map(({ __metadata, ...others }) => ({ ...others, TeamProfilePhotoUrl: others.TeamProfilePhoto.Url }));

export const transformAPIDataItem = ({ __metadata, ...others }: MutationTeamStaffDataItem): TeamStaffDataItem => ({
  ...others,
  TeamProfilePhotoUrl: others.TeamProfilePhoto.Url,
});

export const transformDataItemForAPI = ({
  TeamProfilePhotoUrl,
  TeamProfilePhoto,
  FullName,
  RoleSkills,
  Gender,
  ...others
}: TeamStaffDataItem): MutationTeamStaffDataItem => {
  return {
    ...others,
    TeamProfilePhoto: { ...TeamProfilePhoto, Url: TeamProfilePhotoUrl, Description: TeamProfilePhotoUrl },
    FullName,
    FirstName: FullName.split(' ')[0],
    Title: FullName.split(' ').slice(-1)[0],
    __metadata: { type: 'SP.Data.MetroHR01ListItem' },
  };
};

export const response = {
  d: {
    __metadata: {
      id: "Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)",
      uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)",
      etag: '"1"',
      type: 'SP.Data.MetroHR01ListItem',
    },
    FirstUniqueAncestorSecurableObject: {
      __deferred: {
        uri:
          "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/FirstUniqueAncestorSecurableObject",
      },
    },
    RoleAssignments: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/RoleAssignments",
      },
    },
    AttachmentFiles: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/AttachmentFiles",
      },
    },
    ContentType: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/ContentType" },
    },
    FieldValuesAsHtml: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/FieldValuesAsHtml",
      },
    },
    FieldValuesAsText: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/FieldValuesAsText",
      },
    },
    FieldValuesForEdit: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/FieldValuesForEdit",
      },
    },
    File: { __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/File" } },
    Folder: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/Folder" },
    },
    ParentList: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'7d03d3f4-87da-4c2c-b288-3177bd0d5f44')/Items(8)/ParentList" },
    },
    FileSystemObjectType: 0,
    Id: 8,
    ContentTypeId: '0x010600E37F072AC27B434AA5FE790BA3D3FA2B020045CBBD36A655904A888C19A32D6298F4',
    Title: 'test',
    FirstName: 'tes',
    FullName: 'tes test',
    TeamProfilePhoto: null,
    Company: null,
    WorkPhone: null,
    WorkFax: null,
    ShowOnline: false,
    Email: null,
    CellPhone: '+12 3456 78965',
    JobTitle: 'test',
    Department: null,
    WorkAddress: null,
    WorkCity: null,
    WorkState: null,
    WorkZip: null,
    WorkCountry: null,
    PersonalStatus: null,
    ProfilesStatus: null,
    ManagerId: null,
    TeamUserAccountId: null,
    WorkingWeekDays: null,
    WorkingDayStartTime: null,
    WorkingDayEndTime: null,
    WorkingDayStart02: null,
    WorkingDayEnd02: null,
    WorkingDayStart03: null,
    WorkingDayEnd03: null,
    WorkingDayStart04: null,
    WorkingDayEnd04: null,
    WorkingDayStart05: null,
    WorkingDayEnd05: null,
    WorkingDayStart06: null,
    WorkingDayEnd06: null,
    WorkingDayStart07: null,
    WorkingDayEnd07: null,
    CalendarColour: null,
    CalendarColHex: '#67c82b',
    HomeAddressStreet: null,
    HomeAddressCity: null,
    HomeAddressStateOrProvince: null,
    HomeAddressCountry: null,
    HomeAddressPostalCode: null,
    HomePhone: null,
    StartDate: '2020-12-25T15:50:57Z',
    OData__EndDate: null,
    Comments: null,
    OrganizationalIDNumber: null,
    UserField1: null,
    UserField2: null,
    UserField3: null,
    UserField4: null,
    LookupBP01orgId: null,
    LookupMultiHR02SkillsId: { __metadata: { type: 'Collection(Edm.Int32)' }, results: [] },
    WorkingDayStart01: null,
    WorkingDayEnd01: null,
    ID: 8,
    Modified: '2020-12-25T15:50:57Z',
    Created: '2020-12-25T15:50:57Z',
    AuthorId: 18,
    EditorId: 18,
    OData__UIVersionString: '1.0',
    Attachments: false,
    GUID: 'c83eba6a-2aaf-4108-b9af-0fa10435762a',
  },
};
