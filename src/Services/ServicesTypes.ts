export enum OfferIcons {
  Tooth = 'Tooth',
}

export interface ServicesDataItemMock {
  id: number;
  offerID: number;
  offerIconName: OfferIcons;
  references: string;
  detailsReference: string;
  category: string;
  duration: number;
  isShowOnline: boolean;
  isConsultation: boolean;
  price: number;
  discount: number;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface ServicesDataItem {
  Amount: number;
  AmountSalesTaxLocal: string;
  AmountTotal: string;
  ConsultReq: boolean;
  ID: number;
  Id: number;
  MinutesDuration: number;
  OfferingCatType: string;
  OfferingDiscount: number;
  OfferingsName_Edit: string;
  OfferIconName: OfferIcons;
  SalesTaxRate: number;
  ShowOnline: boolean;
  Title: string;
  __metadata: {
    etag: string;
    id: string;
    type: string;
    uri: string;
  };
  inEdit?: boolean;
  isNew?: boolean;
}

export type ServicesDataItemKeys = keyof ServicesDataItem;

export type ServicesDataItemValues = ServicesDataItem[ServicesDataItemKeys];

export interface ServicesState {
  data: ServicesDataItem[];
}
