import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Grid, GridColumn, ColumnMenu, CurrencyCell, StatusIcon, ActionsControlCell, DateCell, StatusCell } from '../_components';
// Mock
import { AgendaGridData } from './AgendaMockData';
// Selectors
import { selectGridState } from '../_components/Grid';

export const Agenda: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { data, editField, setData, onItemChange } = useSelector(selectGridState);
  const localizationService = useLocalization();

  const onGridItemChange = useCallback(onItemChange(dispatch), [onItemChange, dispatch]);

  useEffect(() => {
    if (data.length > 0) return;

    setData(dispatch, AgendaGridData.slice());
  }, [data, setData, dispatch]);

  return (
    <div id="Dashboard" className="home-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={data} onItemChange={onGridItemChange} editField={editField}>
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
            />
            <GridColumn
              field={'services'}
              title={localizationService.toLanguageString('custom.services', 'Services')}
              columnMenu={ColumnMenu}
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
              filter={'text'}
            />
            <GridColumn title={localizationService.toLanguageString('custom.actions', 'Actions')} cell={ActionsControlCell} />
          </Grid>
        </div>
      </div>
    </div>
  );
};
