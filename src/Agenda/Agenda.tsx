import React, { FC, useState } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Components
import { Grid, GridColumn, ColumnMenu, CurrencyCell, StatusIcon, ActionsControlCell, DateCell, StatusCell } from '../_components';
// Mock
import { AgendaGridData, AgendaDataItem } from './AgendaMockData';
// Helpers
import { updateItem, removeItem } from './AgendaHelpers';

export const Agenda: FC = (): JSX.Element => {
  const [data, setData] = useState(AgendaGridData.slice());
  const localizationService = useLocalization();
  const editField = 'inEdit';

  const onItemEdit = (dataItem: AgendaDataItem) => setData([...data.map((item) => (item.id === dataItem.id ? { ...item, inEdit: true } : item))]);

  const onItemUpdate = (dataItem: AgendaDataItem) => {
    const updatedItem = { ...dataItem, inEdit: false };
    const updatedData = updateItem(data, updatedItem);

    updateItem(AgendaGridData, updatedItem);

    setData(updatedData);
  };

  const onItemRemove = (dataItem: AgendaDataItem) => {
    const updatedData = removeItem(data, dataItem);

    setData(updatedData);
  };

  const onActionCancel = (dataItem: AgendaDataItem) => {
    const originalItem = AgendaGridData.find(({ id }) => id === dataItem.id);
    const recoveredData = data.map((item) => (item.id === originalItem?.id ? originalItem : item));

    setData(recoveredData);
  };

  const onItemChange = (evt: GridItemChangeEvent) => {
    const changeData = data.map((item) => (item.id === evt.dataItem.id ? { ...item, [evt.field as string]: evt.value } : item));

    setData(changeData);
  };

  return (
    <div id="Dashboard" className="home-page main-content">
      <div className="card-container grid">
        <div className="card-component">
          <Grid data={data} onItemChange={onItemChange} editField={editField}>
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
            <GridColumn
              title={localizationService.toLanguageString('custom.actions', 'Actions')}
              cell={ActionsControlCell({ editField, onItemEdit, onItemUpdate, onActionCancel, onItemRemove })}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
