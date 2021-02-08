import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
import { GridColumn } from '@progress/kendo-react-grid';
// Components
import {
  Grid,
  ColumnMenu,
  AgendaStatusIcon,
  AgendaStatusCell,
  AgendaReferenceCell,
  AgendaStartDateCell,
  AgendaEndDateCell,
  AgendaSvcStaffCell,
  AgendaServicesCell,
  AgendaCurrencyCell,
  AgendaFullNameCell,
  AgendaGenderCell,
  AgendaActionsControlCell,
} from '../_sections/Grid';
import { Loader } from '../_components';
// Types
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
import { EntitiesKeys } from '../_bus/Entities/EntitiesTypes';
// Action Creators
import { fetchAppointmentsDataInitAsyncAC } from '../_bus/Entities/EntitiesAC';
// Selectors
import { selectOriginalAppointmentsData } from '../_bus/Entities/EntitiesSelectors';
// Hooks
import { useSelectBindDataLengthForAgenda } from './AgendaHooks';
import { useFetchData } from '../_bus/Hooks/useFetchData';

export const Agenda: FC = (): JSX.Element => {
  const localizationService = useLocalization();
  const appointmentsData = useSelector(selectOriginalAppointmentsData);
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const hasAllData = appointmentsData.length > 0 && servicesDataLength > 0 && staffDataLength > 0 && customersDataLength > 0;
  const initAsyncAC = useCallback(
    () =>
      fetchAppointmentsDataInitAsyncAC({ appointmentsDataLength: appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength }),
    [appointmentsData.length, customersDataLength, servicesDataLength, staffDataLength]
  );
  const isDataLoading = useFetchData(hasAllData, initAsyncAC);

  const contentTSX = hasAllData && !isDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid data={appointmentsData} entityName={EntitiesKeys.Appointments} labelNewItemBtn="New Appointment">
          <GridColumn field={'AppointmentStatus'} title={` `} width={100} editable={false} cell={(AgendaStatusIcon as unknown) as CustomGridCell} />
          <GridColumn
            field={'AppointmentStatus'}
            title={localizationService.toLanguageString('custom.status', 'Status')}
            columnMenu={ColumnMenu}
            cell={(AgendaStatusCell as unknown) as CustomGridCell}
            minResizableWidth={160}
            filter={'text'}
          />
          <GridColumn
            field={'Title'}
            title={localizationService.toLanguageString('custom.references', 'References')}
            columnMenu={ColumnMenu}
            cell={(AgendaReferenceCell as unknown) as CustomGridCell}
            minResizableWidth={130}
            filter={'text'}
          />
          <GridColumn
            field={'Start'}
            title={localizationService.toLanguageString('custom.start', 'Start')}
            columnMenu={ColumnMenu}
            filter={'date'}
            minResizableWidth={190}
            cell={(AgendaStartDateCell as unknown) as CustomGridCell}
          />
          <GridColumn
            field={'End'}
            title={localizationService.toLanguageString('custom.end', 'End')}
            columnMenu={ColumnMenu}
            filter={'date'}
            minResizableWidth={190}
            cell={(AgendaEndDateCell as unknown) as CustomGridCell}
          />
          <GridColumn
            field={'LookupHR01teamId'}
            title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
            columnMenu={ColumnMenu}
            minResizableWidth={160}
            filter={'numeric'}
            cell={(AgendaSvcStaffCell as unknown) as CustomGridCell}
          />
          <GridColumn
            field={'LookupMultiBP01offeringsId'}
            title={localizationService.toLanguageString('custom.services', 'Services')}
            // columnMenu={ColumnMenu}
            cell={(AgendaServicesCell as unknown) as CustomGridCell}
            minResizableWidth={190}
            // filter={'numeric'}
          />
          <GridColumn
            field={'ServiceCharge'}
            title={localizationService.toLanguageString('custom.total', 'Total')}
            columnMenu={ColumnMenu}
            width={90}
            cell={(AgendaCurrencyCell as unknown) as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            field={'LookupCM102customersId'}
            title={localizationService.toLanguageString('custom.fullName', 'Full Name')}
            columnMenu={ColumnMenu}
            minResizableWidth={190}
            cell={(AgendaFullNameCell as unknown) as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.gender', 'Gender')}
            columnMenu={ColumnMenu}
            cell={(AgendaGenderCell as unknown) as CustomGridCell}
            filter={'text'}
            minResizableWidth={160}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.actions', 'Actions')}
            minResizableWidth={140}
            cell={(AgendaActionsControlCell as unknown) as CustomGridCell}
          />
        </Grid>
      </div>
    </div>
  );

  return (
    <>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </>
  );
};
