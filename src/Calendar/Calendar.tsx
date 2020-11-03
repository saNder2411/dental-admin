import React, { useState, useCallback } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
import { guid } from '@progress/kendo-react-common';
// Components
import { Scheduler } from '../_components';
import { CalendarTopControlItem, CalendarHeaderCardCell } from './';
// Styled Components
import * as SC from './CalendarStyled';
// Mocks
import { employees, orders, teams, ordersModelFields } from './CalendarMockData';

const initialFilterState: { [key: string]: boolean } = employees.reduce((prevVal, employee) => ({ ...prevVal, [employee.id]: true }), {});

export const Calendar = () => {
  const localizationService = useLocalization();
  const [filterState, setFilterState] = useState(initialFilterState);
  const [data, setData] = useState(orders);

  const onDataChange = useCallback(({ created, updated, deleted }) => {
    setData((old: any) =>
      old
        // Filter the deleted items
        .filter((item: any) => deleted.find((current: any) => current[ordersModelFields.id] === item[ordersModelFields.id]) === undefined)
        // Find and replace the updated items
        .map((item: any) => updated.find((current: any) => current[ordersModelFields.id] === item[ordersModelFields.id]) || item)
        // Add the newly created items and assign an `id`.
        .concat(created.map((item: any) => Object.assign({}, item, { [ordersModelFields.id]: guid() })))
    );
  }, []);

  const onEmployeeClick = useCallback(
    (employeeId) => {
      setFilterState({ ...filterState, [employeeId]: !filterState[employeeId] });
      console.log(employeeId, filterState);
    },
    [filterState, setFilterState]
  );

  return (
    <SC.Calendar id="Planning" className="planning-page main-content">
      <div className="card-container grid">
        <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')}</h3>
        <div className="card-control-wrapper">
          {employees.map((employee) => (
            <CalendarTopControlItem
              key={employee.id}
              isFiltered={!filterState[employee.id]}
              cardColor={teams.find(({ teamID }: any) => teamID === employee.teamId)?.teamColor ?? ''}
              onEmployeeClick={() => onEmployeeClick(employee.id)}
              fullName={employee.fullName}
            />
          ))}
        </div>
        <div className="card-component">
          <Scheduler
            data={data.filter((event: any) => filterState[event.employeeID ? event.employeeID : ''])}
            onDataChange={onDataChange}
            modelFields={ordersModelFields}
            group={{
              resources: ['Teams'],
            }}
            resources={[
              {
                name: 'Teams',
                data: teams
                  .filter((team) => filterState[team.managerID])
                  .map((item) => ({
                    ...item,
                    text: (
                      <CalendarHeaderCardCell
                        cardColor={item.teamColor}
                        employeeImage={item.photo}
                        fullName={item.managerName}
                        jobTitle={item.jobTitle}
                      />
                    ),
                  })),
                field: 'teamID',
                valueField: 'teamID',
                textField: 'text',
                colorField: 'teamColor',
              },
            ]}
          />
        </div>
      </div>
    </SC.Calendar>
  );
};
