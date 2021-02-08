import React, { FC, useRef, useState, useCallback, useEffect, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid as KendoGrid,
  GridColumnProps,
  GridColumnMenuProps,
  GridColumnMenuFilter,
  GridToolbar,
  GridItemChangeEvent,
  GridDataStateChangeEvent,
} from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { PDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { process, State, SortDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import { useLocalization } from '@progress/kendo-react-intl';
// Types
import { GenericDataItem, EntitiesKeys } from '../../_bus/Entities/EntitiesTypes';
// Action Creators
import { changeItemAC, addNewItemToEditAC } from '../../_bus/Entities/EntitiesAC';

export const ColumnMenu: FC<GridColumnMenuProps> = (props) => <GridColumnMenuFilter {...props} expanded />;

interface Props {
  data: GenericDataItem[];
  entityName: EntitiesKeys;
  labelNewItemBtn: string;
  children: ReactElement<GridColumnProps>[];
}

export const Grid: FC<Props> = ({ data, entityName, labelNewItemBtn, children }) => {
  const excelExportRef = useRef<any>(null);
  const pdfExportRef = useRef<any>(null);
  const dispatch = useDispatch();

  const onGridItemChange = useCallback(
    (evt: GridItemChangeEvent) => {
      evt.syntheticEvent.persist();
      dispatch(changeItemAC({ dataItemID: evt.dataItem, field: evt?.field ?? '', value: evt.value }, entityName));
    },
    [dispatch, entityName]
  );

  const [take, setTake] = useState<number | undefined>(10);
  const [skip, setSkip] = useState<number | undefined>(0);
  const [sort, setSort] = useState<SortDescriptor[] | undefined>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>();
  const [allColumnFilter, setAllColumnFilter] = useState('');
  const localizationService = useLocalization();

  const dataState: State = { take, skip, sort, filter };

  const onDataStateChange = useCallback(
    ({ dataState }: GridDataStateChangeEvent) => {
      setTake(dataState.take);
      setSkip(dataState.skip);
      setSort(dataState.sort);
      setFilter(dataState.filter);
    },
    [setTake, setSkip, setSort]
  );

  const onExcelExport = useCallback(() => excelExportRef?.current.save(), []);

  const onAllColumnFilterChange = useCallback((evt: InputChangeEvent) => setAllColumnFilter(evt.value), [setAllColumnFilter]);

  const textColumns = children.map(({ props }) => (props.filter === 'text' && props.field ? props.field : '')).filter((field) => field);

  const allColumnsFilters = textColumns.map((field) => ({ field, operator: 'contains', value: allColumnFilter }));

  const allColumnFilteredData = allColumnFilter ? process(data, { filter: { logic: 'or', filters: allColumnsFilters } }).data : data;

  const processedData = process(allColumnFilteredData, dataState);

  useEffect(() => {
    if (!processedData.data.length) {
      setSkip(0);
    }
  }, [processedData]);

  const onPdfExport = useCallback(() => {
    if (pdfExportRef.current) {
      pdfExportRef.current.save(processedData.data);
    }
  }, [processedData]);

  const GridElement = (
    <KendoGrid
      {...dataState}
      sortable
      pageable
      data={processedData}
      pageSize={10}
      onItemChange={onGridItemChange}
      onDataStateChange={onDataStateChange}>
      <GridToolbar>
        <div className="text-right p-2">
          <div className="Grid__addNewItemWrapper">
            <Input
              value={allColumnFilter}
              onChange={onAllColumnFilterChange}
              placeholder={localizationService.toLanguageString('custom.gridSearch', `Search in all columns...`)}
            />
            <span className="Grid__addNewItemTitle">{labelNewItemBtn}</span>
            <button title="Add new" className="k-button" onClick={() => dispatch(addNewItemToEditAC(entityName))}>
              <span className="k-icon k-i-plus-circle" />
            </button>
          </div>

          <Button icon="excel" onClick={onExcelExport}>
            {localizationService.toLanguageString('custom.exportExcel', 'Export to Excel')}
          </Button>
          <Button icon="pdf" onClick={onPdfExport} className="ml-2">
            {localizationService.toLanguageString('custom.exportPdf', 'Export to PDF')}
          </Button>
        </div>
      </GridToolbar>

      {children}
    </KendoGrid>
  );

  return (
    <>
      <div style={{ display: 'none' }}>
        <ExcelExport data={data} ref={excelExportRef}>
          {GridElement}
        </ExcelExport>
      </div>
      <PDFExport paperSize="auto" margin={40} fileName={`Report for ${new Date().getFullYear()}`} author="Silver Agenda" ref={pdfExportRef}>
        {GridElement}
      </PDFExport>
    </>
  );
};
