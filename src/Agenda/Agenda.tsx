import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import {
  Grid,
  GridColumn,
  ColumnMenu,
  AgendaStatusIcon,
  AgendaStatusCell,
  AgendaReferenceCell,
  AgendaStartDateCell,
  AgendaEndDateCell,
  AgendaSvcStaffCell,
  AgendaServicesCell,
  GenericCurrencyCell,
  AgendaFullNameCell,
  AgendaGenderCell,
  AgendaActionsControlCell,
} from '../_sections/Grid';
import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridItems/GridItemsTypes';
// Selectors
import { selectDataName } from '../_sections/Grid/GridSelectors';
// Hooks
import { useSetGridDataForDomainWithDataBind } from '../_sections/Grid/GridHooks';
import { useSelectAppointmentsData, useSelectBindDataLengthForAgenda, useFetchAgendaData } from './AgendaHooks';

export const Agenda: FC = (): JSX.Element => {
  const dataName = useSelector(selectDataName);
  const { appointmentsData, isDataLoading } = useSelectAppointmentsData();
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchAgendaData(appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength, dispatch);
  useSetGridDataForDomainWithDataBind(dataName, GridDataName.Appointments, appointmentsData, isDataLoading, dispatch);

  const hasAgendaData = dataName === GridDataName.Appointments;
  const contentTSX = hasAgendaData && !isDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid>
          <GridColumn field={'AppointmentStatus'} title={` `} width={100} editable={false} cell={AgendaStatusIcon as CustomGridCell} />
          <GridColumn
            field={'AppointmentStatus'}
            title={localizationService.toLanguageString('custom.status', 'Status')}
            columnMenu={ColumnMenu}
            cell={AgendaStatusCell as CustomGridCell}
            minResizableWidth={160}
            filter={'text'}
          />
          <GridColumn
            field={'Title'}
            title={localizationService.toLanguageString('custom.references', 'References')}
            columnMenu={ColumnMenu}
            cell={AgendaReferenceCell as CustomGridCell}
            minResizableWidth={130}
            filter={'text'}
          />
          <GridColumn
            field={'Start'}
            title={localizationService.toLanguageString('custom.start', 'Start')}
            columnMenu={ColumnMenu}
            filter={'text'}
            minResizableWidth={190}
            cell={AgendaStartDateCell as CustomGridCell}
          />
          <GridColumn
            field={'End'}
            title={localizationService.toLanguageString('custom.end', 'End')}
            columnMenu={ColumnMenu}
            filter={'text'}
            minResizableWidth={190}
            cell={AgendaEndDateCell as CustomGridCell}
          />
          <GridColumn
            field={'LookupHR01teamId'}
            title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
            columnMenu={ColumnMenu}
            minResizableWidth={160}
            filter={'text'}
            cell={AgendaSvcStaffCell as CustomGridCell}
          />
          <GridColumn
            field={'LookupMultiBP01offeringsId'}
            title={localizationService.toLanguageString('custom.services', 'Services')}
            columnMenu={ColumnMenu}
            cell={AgendaServicesCell as CustomGridCell}
            minResizableWidth={190}
            filter={'text'}
          />
          <GridColumn
            field={'ServiceCharge'}
            title={localizationService.toLanguageString('custom.total', 'Total')}
            columnMenu={ColumnMenu}
            width={90}
            cell={GenericCurrencyCell as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            field={'LookupCM102customersId'}
            title={localizationService.toLanguageString('custom.fullName', 'Full Name')}
            columnMenu={ColumnMenu}
            minResizableWidth={190}
            cell={AgendaFullNameCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Gender'}
            title={localizationService.toLanguageString('custom.gender', 'Gender')}
            columnMenu={ColumnMenu}
            cell={AgendaGenderCell as CustomGridCell}
            filter={'text'}
            minResizableWidth={160}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.actions', 'Actions')}
            minResizableWidth={140}
            cell={AgendaActionsControlCell as CustomGridCell}
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
