export enum OfferIcons {
  Tooth = 'Tooth',
}

export interface ServicesDataItem {
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
}

export interface ServicesState {
  data: ServicesDataItem[];
}
