import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
//Types
import { GridOnChange } from './GridItemsTypes';
import { StaffDataItem } from '../../../_bus/Staff/StaffTypes';
import { CustomerDataItem } from '../../../_bus/Customers/CustomersTypes';
import { ServiceDataItem } from '../../../_bus/Services/ServicesTypes';
import { GenericDataItem, StatusNames } from '../../../_bus/Types';

export const onGridDropDownChange = <T extends GenericDataItem = GenericDataItem>(dataItemID: number, field: keyof T, onChange: GridOnChange<T>) => (
  evt: DropDownListChangeEvent
) => onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: evt.value.value });

export const isNumber = (arg: any): arg is number => typeof arg === 'number';

export const isString = (arg: any): arg is string => typeof arg === 'string';

export const isStatusNames = (arg: any): arg is StatusNames => arg === StatusNames;

export const getOnFinallyRequestDataItem = (...handlers: Array<() => void>) => () => handlers.forEach((handler) => handler());

export const transformDomainDataToDropDownListData = (domainData: Array<StaffDataItem | CustomerDataItem>) =>
  domainData.map((item) => {
    const isTeamStaffDataItem = 'ShowOnline' in item;
    const value = isTeamStaffDataItem ? item.Title : item.FullName;

    return { text: value ?? '', value: item.Id };
  });

export const transformDomainDataToMultiSelectData = (domainData: ServiceDataItem[]) =>
  domainData.map(({ OfferingsName_Edit, Id }) => ({ text: OfferingsName_Edit ?? '', value: Id }));

export const transformTeamStaffDataToMultiSelectData = (domainData: StaffDataItem[]) =>
  domainData.map(({ Title, Id }) => ({ text: Title ?? '', value: Id }));

export const EmptyDropDownListDataItem = { text: '', value: -1 };
