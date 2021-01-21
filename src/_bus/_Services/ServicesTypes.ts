export enum OfferIcons {
  Tooth = 'Tooth',
}

export enum ContentTypes {
  Services = '0x0100E03BE5D98FC3417B84A28F834BEAB5AD020300774B3F93ED0D784DA9C9B20DD43DE598',
  Product = '0x0100E03BE5D98FC3417B84A28F834BEAB5AD0201002C808BD52BC06C4B8CA67C4E3245E35B',
};

interface BackendImmutableKey {
  Id: number;
  OfferingsName_Edit: string | null;
  ShowOnline: boolean;
  ConsultReq: boolean;
  MinutesDuration: number;
  Amount: number;
  ContentTypeId: ContentTypes;
  OfferingCatType: string | null;
  OfferingDiscount: number;
  ID: number;

  ImageThumbnail?: null | OfferIcons;
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