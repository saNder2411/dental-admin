import React, { FC, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid as KendoGrid, GridColumn, GridColumnMenuSort, GridColumnMenuFilter, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { process } from '@progress/kendo-data-query';
import { Input } from '@progress/kendo-react-inputs';
import { useLocalization } from '@progress/kendo-react-intl';
// Selectors
import { selectGridEditField, selectGridTitleForAddNewItemSection, selectGridMemoOriginalData } from './GridSelectors';
import { GridActions } from './GridActions';

export const ColumnMenu = (props: any) => {
  return (
    <div>
      <GridColumnMenuSort {...props} />
      <GridColumnMenuFilter {...props} />
    </div>
  );
};

interface Props {
  children: JSX.Element[];
}

export const Grid: FC<Props> = ({ children }) => {
  const excelExportRef = useRef<any>(null);
  const pdfExportRef = useRef<any>(null);
  const selectOriginalData = useMemo(selectGridMemoOriginalData, []);

  const originalData = useSelector(selectOriginalData);
  const editField = useSelector(selectGridEditField);
  const addItemTitle = useSelector(selectGridTitleForAddNewItemSection);
  const dispatch = useDispatch();
  const { onItemChange, onAddNewItem } = GridActions;

  const onGridItemChange = useCallback(onItemChange(dispatch), [dispatch, onItemChange]);

  const [isPdfExporting, setIsPdfExporting] = useState(false);
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

  const onPdfExportDone = useCallback(() => setIsPdfExporting(false), []);

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

  const allColumnFilteredData = allColumnFilter ? process(originalData, { filter: { logic: 'or', filters: allColumnsFilters } }).data : originalData;

  const processedData = process(allColumnFilteredData, dataState as any);
  console.log(`processedData`, processedData);

  useEffect(() => {
    if (!processedData.data.length) {
      setSkip(0);
    }
  }, [processedData]);

  const onPdfExport = useCallback(() => {
    if (pdfExportRef.current) {
      setIsPdfExporting(true);
      pdfExportRef.current.save(processedData.data, onPdfExportDone);
    }
  }, [processedData, onPdfExportDone]);

  const GridElement = (
    <KendoGrid
      {...dataState}
      rowHeight={40}
      pageable
      sortable
      data={processedData}
      editField={editField}
      onItemChange={onGridItemChange}
      onDataStateChange={onDataStateChange}>
      <GridToolbar>
        <span className="Grid__addNewItemWrapper">
          <Input
            value={allColumnFilter}
            onChange={onAllColumnFilterChange}
            placeholder={localizationService.toLanguageString('custom.gridSearch', `Search in all columns...`)}
          />
          <span className="Grid__addNewItemTitle">{addItemTitle}</span>
          <button title="Add new" className="k-button" onClick={() => onAddNewItem(dispatch)}>
            <span className="k-icon k-i-plus-circle" />
          </button>
        </span>

        <Button icon="excel" onClick={onExcelExport}>
          {localizationService.toLanguageString('custom.exportExcel', 'Export to Excel')}
        </Button>
        <Button icon="pdf" onClick={onPdfExport} disabled={isPdfExporting}>
          {localizationService.toLanguageString('custom.exportPdf', 'Export to PDF')}
        </Button>
      </GridToolbar>

      {children}
    </KendoGrid>
  );

  return (
    <>
      <ExcelExport data={originalData} ref={excelExportRef}>
        {GridElement}
      </ExcelExport>
      <GridPDFExport ref={pdfExportRef}>{GridElement}</GridPDFExport>
    </>
  );
};

export { GridColumn };
