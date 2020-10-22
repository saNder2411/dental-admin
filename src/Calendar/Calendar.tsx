import React, { useState, useCallback } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
import { Card, CardHeader, Avatar, CardTitle, CardSubtitle } from '@progress/kendo-react-layout';
import { guid } from '@progress/kendo-react-common';
// Components
import { Scheduler } from '../_components';
// Styled Components
import * as SC from './CalendarStyledCmp';
// Mocks
import { employees, teams, orders, ordersModelFields } from './CalendarMockData';

const initialFilterState: { [key: string]: boolean } = {};
employees.forEach((employee) => (initialFilterState[employee.id] = true));

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
      setFilterState({
        ...filterState,
        [employeeId]: !filterState[employeeId],
      });
      console.log(employeeId, filterState);
    },
    [filterState, setFilterState]
  );

  return (
    <div id="Planning" className="planning-page main-content">
      <div className="card-container grid">
        <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')}</h3>
        {employees.map((employee) => (
          <SC.EmployeeCard
            key={employee.id}
            onClick={() => onEmployeeClick(employee.id)}
            isFiltered={!filterState[employee.id]}
            cardColor={teams.find(({ teamID }: any) => teamID === employee.teamId)?.teamColor ?? ''}>
            <Card>
              <CardHeader className="k-hbox">
                <Avatar type="image" shape="circle">
                  <img src={employee.photo} alt="employee avatar" />
                </Avatar>
                <div>
                  <CardTitle>{employee.fullName}</CardTitle>
                  <CardSubtitle>{employee.jobTitle}</CardSubtitle>
                </div>
              </CardHeader>
            </Card>
          </SC.EmployeeCard>
        ))}
        <div className="card-component">
          <Scheduler
            data={data.filter((event: any) => filterState[event.employeeID ? event.employeeID : ''])}
            onDataChange={onDataChange}
            modelFields={ordersModelFields}
            resources={[
              {
                name: 'Teams',
                data: teams,
                field: 'teamID',
                valueField: 'teamID',
                textField: 'teamName',
                colorField: 'teamColor',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
