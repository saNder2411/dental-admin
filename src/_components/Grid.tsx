import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Grid as KendoGrid, GridColumn, GridColumnMenuSort, GridColumnMenuFilter, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { process } from '@progress/kendo-data-query';
import { Input } from '@progress/kendo-react-inputs';
import { useLocalization } from '@progress/kendo-react-intl';

export { GridColumn };

export const ColumnMenu = (props: any) => {
  return (
    <div>
      <GridColumnMenuSort {...props} />
      <GridColumnMenuFilter {...props} />
    </div>
  );
};

export const Grid = ({ data, onDataChange, children, ...others }: any) => {
  const excelExportRef = useRef<any>(null);
  const pdfExportRef = useRef<any>(null);

  const [isPdfExporting, setIsPdfExporting] = useState(false);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState([]);
  const [group, setGroup] = useState([]);
  const [filter, setFilter] = useState(null);
  const lastSelectedIndexRef = useRef(0);
  const [allColumnFilter, setAllColumnFilter] = useState('');
  const localizationService = useLocalization();

  const dataState = {
    take,
    skip,
    sort,
    group,
    filter,
  };

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

  const onAllColumnFilterChange = useCallback((evt) => setAllColumnFilter(evt.value), [setAllColumnFilter]);

  const onSelectionChange = useCallback(
    (evt) => {
      let last = lastSelectedIndexRef.current;
      const updatedData = data.map((dataItem: any) => {
        return { ...dataItem };
      });
      const current = data.findIndex((dataItem: any) => dataItem === evt.dataItem);

      if (!evt.nativeEvent.shiftKey) {
        lastSelectedIndexRef.current = last = current;
      }

      if (!evt.nativeEvent.ctrlKey) {
        updatedData.forEach((item: any) => (item.selected = false));
      }
      const select = !evt.dataItem.selected;
      for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
        updatedData[i].selected = select;
      }

      onDataChange(updatedData);
    },
    [data, onDataChange]
  );

  const onHeaderSelectionChange = useCallback(
    (evt) => {
      const checked = evt.syntheticEvent.target.checked;
      const updatedData = data.map((item: any) => {
        return {
          ...item,
          selected: checked,
        };
      });

      onDataChange(updatedData);
    },
    [data, onDataChange]
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
      setIsPdfExporting(true);
      pdfExportRef.current.save(processedData.data, onPdfExportDone);
    }
  }, [processedData, onPdfExportDone]);

  const GridElement = (
    <KendoGrid
      {...dataState}
      {...others}
      rowHeight={40}
      pageable
      sortable
      groupable
      data={processedData}
      onDataStateChange={onDataStateChange}
      onSelectionChange={onSelectionChange}
      onHeaderSelectionChange={onHeaderSelectionChange}>
      <GridToolbar>
        <Input
          value={allColumnFilter}
          onChange={onAllColumnFilterChange}
          placeholder={localizationService.toLanguageString('custom.gridSearch', `Search in all columns...`)}
        />
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
      <ExcelExport data={data} ref={excelExportRef}>
        {GridElement}
      </ExcelExport>
      <GridPDFExport ref={pdfExportRef}>{GridElement}</GridPDFExport>
    </>
  );
};
