import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectGridDataItemMemoValueForCell, selectOriginalDataItemFieldValue, selectProcessDataItemFieldValue } from '../../GridSelectors';
// Types
import { GridDataItem } from '../../GridTypes';

export const useMemoDataItemValuesForCells = <T = GridDataItem>(ID: number, field: keyof T) => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);

  const selectCellValue = useMemo(() => selectGridDataItemMemoValueForCell<T>(memoID, memoField), [memoField, memoID]);
  const selectDataItemInEditValue = useMemo(() => selectGridDataItemMemoValueForCell<T>(memoID, (`inEdit` as unknown) as keyof T), [memoID]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = (useSelector(selectDataItemInEditValue) as unknown) as boolean;

  return { memoID, memoField, cellValue, dataItemInEditValue };
};

export const useOriginalDataItemValuesForCells = (ID: number, field: keyof GridDataItem) => {
  const selectCellValue = useMemo(() => selectOriginalDataItemFieldValue(ID, field), [ID, field]);
  const selectDataItemInEditValue = useMemo(() => selectOriginalDataItemFieldValue(ID, `inEdit`), [ID]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = (useSelector(selectDataItemInEditValue) as unknown) as boolean;
  return { cellValue, dataItemInEditValue };
};

export const useProcessDataItemValuesForCells = <T extends GridDataItem = GridDataItem>(ID: number, field: keyof T) => {
  const selectCellValue = useMemo(() => selectProcessDataItemFieldValue<T>(ID, field), [ID, field]);
  const selectDataItemInEditValue = useMemo(() => selectProcessDataItemFieldValue(ID, `inEdit`), [ID]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = (useSelector(selectDataItemInEditValue) as unknown) as boolean;
  return { cellValue, dataItemInEditValue };
};
