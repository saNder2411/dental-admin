// Types
import { ServiceDataItem, QueryServiceDataItem, MutationServiceDataItem } from './ServicesTypes';

export const transformAPIData = (apiResults: QueryServiceDataItem[]): ServiceDataItem[] => apiResults.map(({ __metadata, ...dataItem }) => dataItem);

export const transformAPIDataItem = ({ __metadata, ...dataItem }: QueryServiceDataItem): ServiceDataItem => dataItem;

export const transformDataItemForAPI = ({ inEdit, isNew, RoleSkills, ...dataItem }: ServiceDataItem): MutationServiceDataItem => ({
  ...dataItem,
  __metadata: { type: 'SP.Data.MetroBP02ListItem' },
});

export const response = {
  d: {
    __metadata: {
      id: "Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)",
      uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)",
      etag: '"1"',
      type: 'SP.Data.MetroBP02ListItem',
    },
    FirstUniqueAncestorSecurableObject: {
      __deferred: {
        uri:
          "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/FirstUniqueAncestorSecurableObject",
      },
    },
    RoleAssignments: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/RoleAssignments",
      },
    },
    AttachmentFiles: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/AttachmentFiles",
      },
    },
    ContentType: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/ContentType" },
    },
    FieldValuesAsHtml: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/FieldValuesAsHtml",
      },
    },
    FieldValuesAsText: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/FieldValuesAsText",
      },
    },
    FieldValuesForEdit: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/FieldValuesForEdit",
      },
    },
    File: { __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/File" } },
    Folder: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/Folder" },
    },
    ParentList: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'88f709c0-e906-4caf-bee4-1c61babc71f5')/Items(56)/ParentList" },
    },
    FileSystemObjectType: 0,
    Id: 56,
    ContentTypeId: '0x0100E03BE5D98FC3417B84A28F834BEAB5AD020300774B3F93ED0D784DA9C9B20DD43DE598',
    Title: null,
    OfferingsName_Edit: null,
    ReleaseStatus: null,
    ShowOnline: false,
    ConsultReq: false,
    Description0: null,
    LandingPageA: null,
    DemoOptions: null,
    DeliveryMethod: null,
    OfferingUnits: '(01) Minutes',
    OfferingUnitsQty: 1,
    MinutesDuration: 60,
    OfferingMinQty: null,
    OfferingMaxQty: null,
    CurrencyType: null,
    Amount: 50,
    FX_Rate: 1,
    AmountTotal: '50.0000000000000',
    PackageOfferings: null,
    FX_Rate_Local: 1,
    SalesTaxRate: null,
    AmountTotalLocal: '50.0000000000000',
    AmountSalesTaxLocal: '0',
    OfferingCatType: null,
    OfferingSupplierCurrency: null,
    DiscountedRatePurchase: null,
    DiscountedAmountPurchase: '50.0000000000000',
    DiscountedRateDistributor: null,
    DiscountedAmountDistributor: '50.0000000000000',
    DiscountedRateWholesale: null,
    DiscountedAmountWholesale: '50.0000000000000',
    Description1: null,
    Description2: null,
    Description3: null,
    ImageLarge: null,
    ConversionPageA: null,
    ImageMedium: null,
    ImageSmall: null,
    ImageThumbnail: null,
    LoyaltyPoints: null,
    OfferingDiscount: 0,
    LandingPageTemplate: null,
    InventoryAmount: null,
    LocalCurrency: null,
    DownloadAllowance: null,
    ShippingCosts: null,
    DownloadsLink: null,
    InventoryMethod: null,
    OfferingHeight: null,
    OfferingLength: null,
    OfferingWidth: null,
    OfferingWeight: null,
    OfferingsStatus: null,
    LookupMultiHR02SkillsId: { __metadata: { type: 'Collection(Edm.Int32)' }, results: [] },
    MinutesDurationL: null,
    ID: 56,
    Modified: '2020-12-25T15:52:18Z',
    Created: '2020-12-25T15:52:18Z',
    AuthorId: 18,
    EditorId: 18,
    OData__UIVersionString: '1.0',
    Attachments: false,
    GUID: '26da75ea-5dc1-408d-8fbe-9c16d2a600ee',
  },
};
