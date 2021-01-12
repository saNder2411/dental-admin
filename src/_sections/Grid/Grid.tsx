import React, { FC, useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid as KendoGrid,
  GridColumn,
  GridColumnMenuSort,
  GridColumnMenuFilter,
  GridToolbar,
  GridItemChangeEvent,
} from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { PDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { process } from '@progress/kendo-data-query';
import { Input } from '@progress/kendo-react-inputs';
import { useLocalization } from '@progress/kendo-react-intl';
// Types
import { GenericDataItem, EntitiesKeys } from '../../_bus/Types';
// Action Creators
import { changeItemAC, addNewItemToEditAC } from '../../_bus/AC';

export const ColumnMenu: FC<any> = (props) => {
  return (
    <div>
      <GridColumnMenuSort {...props} />
      <GridColumnMenuFilter {...props} />
    </div>
  );
};

interface Props {
  data: GenericDataItem[];
  entityName: EntitiesKeys;
  labelNewItemBtn: string;
  children: JSX.Element[];
}

export const Grid: FC<Props> = ({ data, entityName, labelNewItemBtn, children }) => {
  const excelExportRef = useRef<any>(null);
  const pdfExportRef = useRef<any>(null);
  const dispatch = useDispatch();

  const onGridItemChange = useCallback(
    (evt: GridItemChangeEvent) => {
      evt.syntheticEvent.persist();
      dispatch(changeItemAC({ dataItemID: evt.dataItem, field: evt?.field ?? '', value: evt.value, entityName }));
    },
    [dispatch, entityName]
  );

  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState([]);
  const [group, setGroup] = useState([]);
  const [filter, setFilter] = useState();
  const [allColumnFilter, setAllColumnFilter] = useState('');
  const localizationService = useLocalization();

  const dataState = { take, skip, sort, group, filter };

  const onDataStateChange = useCallback(
    (event) => {
      setTake(event.data.take);
      setSkip(event.data.skip);
      setSort(event.data.sort);
      setGroup(event.data.group);
      setFilter(event.data.filter);
    },
    [setTake, setSkip, setSort, setGroup]
  );

  const onExcelExport = useCallback(() => excelExportRef?.current.save(), []);

  const onAllColumnFilterChange = useCallback(
    (evt) => {
      console.log(evt);
      setAllColumnFilter('');
    },
    [setAllColumnFilter]
  );

  const textColumns = children
    .map((col: any) => {
      if (col.props.children) {
        return col.props.children.map((child: any) => {
          if (!child.props.filter || child.props.filter === 'text') {
            return child.props.field;
          }
          return child;
        });
      } else if (col.props.field) {
        if (!col.props.filter || col.props.filter === 'text') {
          return col.props.field;
        }

        return col;
      }
      return col;
    })
    .flat()
    .filter((field: any) => field);

  const allColumnsFilters = textColumns.map((column: any) => ({
    field: column,
    operator: 'contains',
    value: allColumnFilter,
  }));

  const allColumnFilteredData = allColumnFilter ? process(data, { filter: { logic: 'or', filters: allColumnsFilters } }).data : data;

  const processedData = process(allColumnFilteredData, dataState as any);

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
      rowHeight={40}
      pageable
      sortable
      data={processedData}
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

export { GridColumn };
