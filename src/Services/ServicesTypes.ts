export enum OfferIcons {
  Tooth = 'Tooth',
}

interface BackendImmutableKey {
  Id: number;
  OfferingsName_Edit: string | null;
  ShowOnline: boolean;
  ConsultReq: boolean;
  MinutesDuration: number;
  Amount: number;
  OfferingCatType: string | null;
  OfferingDiscount: number;
  ID: number;

  OfferingIconName?: null | OfferIcons;
  RoleSkills?: null | string[];
}

interface FrontendKey {
  inEdit?: boolean;
  isNew?: boolean;
}

export interface QueryServiceDataItem extends BackendImmutableKey {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: 'SP.Data.MetroBP02ListItem';
  };
}

export interface ServiceDataItem extends BackendImmutableKey, FrontendKey {}

export interface MutationServiceDataItem extends BackendImmutableKey {
  __metadata: { type: `SP.Data.MetroBP02ListItem` };
}