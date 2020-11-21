import React, { FC, useState, useRef } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Popup } from '@progress/kendo-react-popup';
// Instruments
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
// Types
import { GridCellProps, InputChangeEvent } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
// Helpers
import { isString } from './GridComponentsHelpers';


export const GenericReferenceCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';

  const onReferenceChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <GridCellDecoratorWithDataItemLoadingState>
        <Input value={strValue} placeholder="Ref: TBA-000" onChange={onReferenceChange} />
      </GridCellDecoratorWithDataItemLoadingState>
    </td>
  ) : (
    <SC.ReferenceCell ref={anchorRef} id="td-p" onClick={() => setShowPopup((prevState) => !prevState)}>
      {value}
      <Popup
        show={showPopup}
        anchor={anchorRef.current as HTMLTableDataCellElement}
        style={{ width: anchorRef.current?.offsetWidth }}
        popupClass="popup-content">
        <p>Details reference</p>
        {strValue}...
      </Popup>
    </SC.ReferenceCell>
  );
};