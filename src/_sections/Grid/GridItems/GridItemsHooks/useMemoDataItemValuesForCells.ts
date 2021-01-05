import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectGridDataItemMemoValueForCell, selectByIdDataItemFieldValue } from '../../GridSelectors';
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

export const useOriginalDataItemValuesForCells = <T extends GridDataItem = GridDataItem, U = any>(ID: number, field: keyof T) => {
  const selectCellValue = useMemo(() => selectByIdDataItemFieldValue<T, U>(ID, field), [ID, field]);
  const selectDataItemInEditValue = useMemo(() => selectByIdDataItemFieldValue<T, boolean | undefined>(ID, `inEdit`), [ID]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = (useSelector(selectDataItemInEditValue) as unknown) as boolean;
  return { cellValue, dataItemInEditValue };
};

// export const useProcessDataItemValuesForCells = <T extends GridDataItem = GridDataItem, U = any>(ID: number, field: keyof T) => {
//   const selectCellValue = useMemo(() => selectProcessDataItemFieldValue<T, U>(ID, field), [ID, field]);
//   const selectDataItemInEditValue = useMemo(() => selectProcessDataItemFieldValue(ID, `inEdit`), [ID]);

//   const cellValue = useSelector(selectCellValue);
//   const dataItemInEditValue = (useSelector(selectDataItemInEditValue) as unknown) as boolean;
//   return { cellValue, dataItemInEditValue };
// };
