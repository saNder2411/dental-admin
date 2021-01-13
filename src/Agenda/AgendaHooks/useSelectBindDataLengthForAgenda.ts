import { useSelector } from 'react-redux';
// Selectors
import {
  selectOriginalCustomersDataLength,
  selectOriginalStaffDataLength,
  selectOriginalServicesDataLength,
} from '../../_bus/Entities/EntitiesSelectors';

export const useSelectBindDataLengthForAgenda = () => {
  const customersDataLength = useSelector(selectOriginalCustomersDataLength);
  const staffDataLength = useSelector(selectOriginalStaffDataLength);
  const servicesDataLength = useSelector(selectOriginalServicesDataLength);

  return { customersDataLength, staffDataLength, servicesDataLength };
};
