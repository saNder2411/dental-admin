import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  LastNameCell,
  ServicesCell,
} from '../_sections';
// Mock
import { AgendaGridData } from './AgendaMockData';
// Selectors
import { selectGridState } from '../_sections/Grid';
// Types
import { GridDataName } from '../_sections/Grid';

export const Agenda: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { data, editField, setData, onItemChange, onAddNewItem, titleForAddNewItemSection, dataName } = useSelector(selectGridState);
  const localizationService = useLocalization();
  const hasAgendaData = dataName === GridDataName.Agenda;

  const onGridItemChange = useCallback(onItemChange(dispatch), [dispatch, onItemChange]);
  const onAddNewGridItem = useCallback(() => onAddNewItem(dispatch), [dispatch, onAddNewItem]);

  useEffect(() => {
    if (dataName === GridDataName.Agenda) return;

    setData(dispatch, AgendaGridData.slice());
  }, [dataName, setData, dispatch]);

  return (
    <div id="Dashboard" className="home-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid
            data={hasAgendaData ? data : []}
            editField={editField}
            addItemTitle={titleForAddNewItemSection}
            onItemChange={onGridItemChange}
            onAddNewItem={onAddNewGridItem}>
            <GridColumn width={100} cell={StatusIcon} />
            <GridColumn
              field={'status'}
              title={localizationService.toLanguageString('custom.status', 'Status')}
              columnMenu={ColumnMenu}
              cell={StatusCell}
              filter={'text'}
            />
            <GridColumn
              field={'references'}
              title={localizationService.toLanguageString('custom.references', 'References')}
              columnMenu={ColumnMenu}
              filter={'text'}
            />
            <GridColumn
              field={'start'}
              title={localizationService.toLanguageString('custom.start', 'Start')}
              columnMenu={ColumnMenu}
              filter={'text'}
              cell={DateCell}
            />
            <GridColumn
              field={'end'}
              title={localizationService.toLanguageString('custom.end', 'End')}
              columnMenu={ColumnMenu}
              filter={'text'}
              cell={DateCell}
            />
            <GridColumn
              field={'svcStaff'}
              title={localizationService.toLanguageString('custom.svcStaff', 'Svc Staff')}
              columnMenu={ColumnMenu}
              width={110}
              filter={'text'}
              cell={SvcStaffCell}
            />
            <GridColumn
              field={'services'}
              title={localizationService.toLanguageString('custom.services', 'Services')}
              columnMenu={ColumnMenu}
              cell={ServicesCell}
              filter={'text'}
            />
            <GridColumn
              field={'budget'}
              title={localizationService.toLanguageString('custom.total', 'Total')}
              columnMenu={ColumnMenu}
              width={90}
              cell={CurrencyCell}
              filter={'numeric'}
            />
            <GridColumn
              field={'lastName'}
              title={localizationService.toLanguageString('custom.lastName', 'Last Name')}
              columnMenu={ColumnMenu}
              width={120}
              cell={LastNameCell}
              filter={'text'}
            />
            <GridColumn title={localizationService.toLanguageString('custom.actions', 'Actions')} cell={ActionsControlCell} />
          </Grid>
        </div>
      </div>
    </div>
  );
};
