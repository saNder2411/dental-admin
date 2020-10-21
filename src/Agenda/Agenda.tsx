import React, { useState, useCallback } from 'react';
import { useLocalization } from '@progress/kendo-react-intl';
import { Card, CardHeader, Avatar, CardTitle, CardSubtitle } from '@progress/kendo-react-layout';
import { guid } from '@progress/kendo-react-common';
// Components
import { Scheduler } from '../_components';
// Mocks
import { employees, teams, orders, ordersModelFields } from './AgendaMockData';

const initialFilterState: { [key: string]: boolean } = {};
console.log(`orderEmployees`, employees);

employees.forEach((employee) => (initialFilterState[employee.id] = true));

export const Agenda = () => {
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

  const photoStyle = {
    display: 'inline-block',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundSize: '32px 35px',
    backgroundPosition: 'center center',
    borderWidth: 2,
    borderStyle: 'solid',
    verticalAlign: 'middle',
    lineHeight: '32px',
    boxShadow: 'inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2)',
    marginLeft: '5px',
  };

  return (
    <div id="Planning" className="planning-page main-content">
      <div className="card-container grid">
        <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')}</h3>
        {employees.map((employee) => {
          return (
            <div key={employee.id} onClick={() => onEmployeeClick(employee.id)} style={!filterState[employee.id] ? { opacity: 0.5 } : {}}>
              <Card style={{ borderWidth: 0, cursor: 'pointer' }}>
                <CardHeader className="k-hbox">
                  <Avatar type="image" shape="circle">
                    <img
                      alt=""
                      style={{
                        backgroundImage: `url(${employee.photo})`,
                        borderColor: teams.find(({ teamID }: any) => teamID === employee.teamId)?.teamColor,
                        ...photoStyle,
                      }}
                    />
                  </Avatar>
                  <div>
                    <CardTitle style={{ color: teams?.find(({ teamID }: any) => teamID === employee.teamId)?.teamColor }}>
                      {employee.fullName}
                    </CardTitle>
                    <CardSubtitle>{employee.jobTitle}</CardSubtitle>
                  </div>
                </CardHeader>
              </Card>
            </div>
          );
        })}
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
