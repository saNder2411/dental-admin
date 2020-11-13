// Config
import { ROOT_URL } from './config';
// Types
import { ServicesDataItem } from '../Services/ServicesTypes';

export type FetchData<T> = () => Promise<T>;
export type CreateDataItem<T> = (createdDataItem: T) => Promise<T>;
export type UpdateDataItem<T> = (updatedDataItem: T) => Promise<T>;
export type DeleteDataItem = (deletedItemID: number) => Promise<number>;

interface API {
  services: {
    getServicesData: FetchData<ServicesDataItem[]>;
    createService: CreateDataItem<ServicesDataItem>;
    updateService: UpdateDataItem<ServicesDataItem>;
    deleteService: DeleteDataItem;
  };
}

export const API: API = {
  services: {
    getServicesData: () => fetch(`${ROOT_URL}/services`).then((response) => response.json()),

    createService: (createdService: ServicesDataItem) =>
      fetch(`${ROOT_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdService),
      }).then((response) => response.json()),

    updateService: (updatedService: ServicesDataItem) =>
      fetch(`${ROOT_URL}/services/${updatedService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      }).then((response) => response.json()),

    deleteService: (deletedServiceID: number) =>
      fetch(`${ROOT_URL}/services/${deletedServiceID}`, {
        method: 'DELETE',
      }).then((response) => response.json()),
  },
};
