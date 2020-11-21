import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import {
  Grid,
  GridColumn,
  ColumnMenu,
  AgendaStatusIcon,
  AgendaStatusCell,
  GenericReferenceCell,
  DateCell,
  AgendaSvcStaffCell,
  AgendaServicesCell,
  CurrencyCell,
  AgendaFullNameCell,
  GenderCell,
  ActionsControlCell,
} from '../_sections/Grid';

import { Loader } from '../_components';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';
// Hooks
import { useGridStateForDomain } from '../_sections/Grid/GridHooks';
import { useAgendaStateForDomain, useActionMetaForAgendaFetchData, useFetchAgendaData, useSetGridDataForAgenda } from './AgendaHooks';

export const Agenda: FC = (): JSX.Element => {
  const { data, dataName, GridActions } = useGridStateForDomain();
  const { agendaData, agendaIsDataLoading, AgendaActions } = useAgendaStateForDomain();
  const { servicesDataLength, teamStaffDataLength, customersDataLength } = useActionMetaForAgendaFetchData();
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  useFetchAgendaData(agendaData.length, servicesDataLength, teamStaffDataLength, customersDataLength, AgendaActions, dispatch);
  useSetGridDataForAgenda(dataName, GridDataName.Agenda, agendaData, agendaIsDataLoading, GridActions, dispatch);

  const hasAgendaData = dataName === GridDataName.Agenda;
  const contentTSX = hasAgendaData && !agendaIsDataLoading && (
    <div className="card-container grid">
      <div className="card-component">
        <Grid data={data}>
          <GridColumn field={'AppointmentStatus'} title={` `} width={100} editable={false} cell={AgendaStatusIcon as CustomGridCell} />
          <GridColumn
            field={'AppointmentStatus'}
            title={localizationService.toLanguageString('custom.status', 'Status')}
            columnMenu={ColumnMenu}
            cell={AgendaStatusCell as CustomGridCell}
            width={130}
            filter={'text'}
          />
          <GridColumn
            field={'Title'}
            title={localizationService.toLanguageString('custom.references', 'References')}
            columnMenu={ColumnMenu}
            cell={GenericReferenceCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'FilterStart'}
            title={localizationService.toLanguageString('custom.start', 'Start')}
            columnMenu={ColumnMenu}
            filter={'text'}
            width={120}
            cell={DateCell as CustomGridCell}
          />
          <GridColumn
            field={'FilterEnd'}
            title={localizationService.toLanguageString('custom.end', 'End')}
            columnMenu={ColumnMenu}
            filter={'text'}
            width={120}
            cell={DateCell as CustomGridCell}
          />
          <GridColumn
            field={'LookupHR01team'}
            title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
            columnMenu={ColumnMenu}
            width={140}
            filter={'text'}
            cell={AgendaSvcStaffCell as CustomGridCell}
          />
          <GridColumn
            field={'LookupMultiBP01offerings'}
            title={localizationService.toLanguageString('custom.services', 'Services')}
            columnMenu={ColumnMenu}
            cell={AgendaServicesCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'ServiceCharge'}
            title={localizationService.toLanguageString('custom.total', 'Total')}
            columnMenu={ColumnMenu}
            width={90}
            cell={CurrencyCell as CustomGridCell}
            filter={'numeric'}
          />
          <GridColumn
            field={'FullName'}
            title={localizationService.toLanguageString('custom.fullName', 'Full Name')}
            columnMenu={ColumnMenu}
            width={140}
            cell={AgendaFullNameCell as CustomGridCell}
            filter={'text'}
          />
          <GridColumn
            field={'Gender'}
            title={localizationService.toLanguageString('custom.gender', 'Gender')}
            columnMenu={ColumnMenu}
            cell={GenderCell as CustomGridCell}
            filter={'text'}
            width={120}
          />
          <GridColumn
            title={localizationService.toLanguageString('custom.actions', 'Actions')}
            width={140}
            cell={ActionsControlCell as CustomGridCell}
          />
        </Grid>
      </div>
    </div>
  );

  return (
    <div id="Dashboard" className="home-page main-content">
      {contentTSX}
      <Loader className="mt-5" isLoading={agendaIsDataLoading} size={'large'} type="infinite-spinner" />
    </div>
  );
};
