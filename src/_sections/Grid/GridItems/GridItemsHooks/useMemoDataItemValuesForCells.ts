import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectGridDataItemMemoValueForCell } from '../../GridSelectors';
// Types
import { GridDataItem } from '../../GridTypes';


export const useMemoDataItemValuesForCells = <T = GridDataItem>(ID: number, field: keyof T) => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);

  const selectCellValue = useMemo(() => selectGridDataItemMemoValueForCell<T>(memoID, memoField), [memoField, memoID]);
  const selectDataItemInEditValue = useMemo(() => selectGridDataItemMemoValueForCell<T>(memoID, (`inEdit` as unknown) as keyof T), [memoID]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = useSelector(selectDataItemInEditValue) as unknown as boolean;

  return { memoID, memoField, cellValue, dataItemInEditValue };
};
