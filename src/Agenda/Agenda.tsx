import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import {
  Grid,
  GridColumn,
  ColumnMenu,
  CurrencyCell,
  StatusIcon,
  ActionsControlCell,
  DateCell,
  StatusCell,
  SvcStaffCell,
  FullNameCell,
  MultiSelectCell,
  GenderCell,
  ReferenceCell,
} from '../_sections';
// Mock
import { AgendaGridData } from './AgendaMockData';
// Selectors
import { selectGridData, selectGridDataName, selectGridActions } from '../_sections/Grid';
// Types
import { GridDataName } from '../_sections/Grid';
import { CustomGridCell } from '../_sections/Grid/GridComponents/GridComponentsTypes';

export const Agenda: FC = (): JSX.Element => {
  const data = useSelector(selectGridData);
  const dataName = useSelector(selectGridDataName);
  const dispatch = useDispatch();
  const { setData } = useSelector(selectGridActions, shallowEqual);

  const localizationService = useLocalization();

  useEffect(() => {
    if (dataName === GridDataName.Agenda) return;

    setData(dispatch, AgendaGridData.slice());
  }, [dataName, setData, dispatch]);

  const hasAgendaData = dataName === GridDataName.Agenda;

  return (
    <div id="Dashboard" className="home-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={hasAgendaData ? data : []}>
            <GridColumn field={'status'} title={` `} width={100} cell={StatusIcon as CustomGridCell} />
            <GridColumn
              field={'status'}
              title={localizationService.toLanguageString('custom.status', 'Status')}
              columnMenu={ColumnMenu}
              cell={StatusCell as CustomGridCell}
              width={130}
              filter={'text'}
            />
            <GridColumn
              field={'references'}
              title={localizationService.toLanguageString('custom.references', 'References')}
              columnMenu={ColumnMenu}
              cell={ReferenceCell as CustomGridCell}
              filter={'text'}
            />
            <GridColumn
              field={'start'}
              title={localizationService.toLanguageString('custom.start', 'Start')}
              columnMenu={ColumnMenu}
              filter={'text'}
              width={120}
              cell={DateCell as CustomGridCell}
            />
            <GridColumn
              field={'end'}
              title={localizationService.toLanguageString('custom.end', 'End')}
              columnMenu={ColumnMenu}
              filter={'text'}
              width={120}
              cell={DateCell as CustomGridCell}
            />
            <GridColumn
              field={'svcStaff'}
              title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
              columnMenu={ColumnMenu}
              width={140}
              filter={'text'}
              cell={SvcStaffCell as CustomGridCell}
            />
            <GridColumn
              field={'services'}
              title={localizationService.toLanguageString('custom.services', 'Services')}
              columnMenu={ColumnMenu}
              cell={MultiSelectCell as CustomGridCell}
              filter={'text'}
            />
            <GridColumn
              field={'totalPrice'}
              title={localizationService.toLanguageString('custom.total', 'Total')}
              columnMenu={ColumnMenu}
              width={90}
              cell={CurrencyCell as CustomGridCell}
              filter={'numeric'}
            />
            <GridColumn
              field={'fullName'}
              title={localizationService.toLanguageString('custom.fullName', 'Full Name')}
              columnMenu={ColumnMenu}
              width={140}
              cell={FullNameCell as CustomGridCell}
              filter={'text'}
            />
            <GridColumn
              field={'customerGender'}
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
    </div>
  );
};
