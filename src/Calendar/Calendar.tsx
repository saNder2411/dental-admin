import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
import { guid } from '@progress/kendo-react-common';
// Components
import { Scheduler } from '../_sections';
import { CalendarTopControlItem, CalendarHeaderCardCell } from './';
// Styled Components
import * as SC from './CalendarStyledComponents/CalendarStyled';
// Selectors
import { selectSchedulerState } from '../_sections/Scheduler';
// Mocks
import { ordersModelFields } from './CalendarMockData';
import { StatusNames } from '../Agenda';

export const Calendar = () => {
  const { data, filterEmployee, teams, employees, setData, onEmployeeChange, setFormItem } = useSelector(selectSchedulerState);
  const dispatch = useDispatch();
  const localizationService = useLocalization();

  const onDataChange = useCallback(
    ({ created, updated, deleted }: SchedulerDataChangeEvent) => {
      const newData = data
        // Filter the deleted items
        .filter((item) => deleted.find((current) => current[ordersModelFields.id] === item.orderID) === undefined)
        // Find and replace the updated items
        .map((item) => updated.find((current) => current[ordersModelFields.id] === item.orderID) || item)
        // Add the newly created items and assign an `id`.
        .concat(created.map((item) => Object.assign({}, item, { [ordersModelFields.id]: guid() })));
      setData(dispatch, newData);
    },
    [data, dispatch, setData]
  );

  const onEmployeeClick = useCallback((employeeID) => onEmployeeChange(dispatch, employeeID), [dispatch, onEmployeeChange]);

  return (
    <SC.Calendar id="Planning" className="planning-page main-content">
      <div className="card-container grid">
        <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')}</h3>
        <div className="card-control-wrapper">
          {employees.map((employee) => (
            <CalendarTopControlItem
              key={employee.ID}
              isFiltered={!filterEmployee[employee.ID]}
              cardColor={teams.find(({ teamID }) => teamID === employee.ID)?.teamColor ?? ''}
              onEmployeeClick={() => onEmployeeClick(employee.ID)}
              fullName={employee.FullName}
            />
          ))}
        </div>
        <div className="Calendar__addNewItemWrapper">
          <span className="Calendar__addNewItemTitle">New Appointment</span>
          <button
            title="Add new"
            className="k-button"
            onClick={() =>
              setFormItem(dispatch, {
                staff: '',
                start: new Date(),
                end: new Date(),
                orderID: -1,
                refID: '',
                status: StatusNames.Closed,
                dentalStatus: StatusNames.Tooth,
                mobilePhone: '',
                email: '',
                notes: '',
                employeeID: 0,
                teamID: 0,
                description: '',
                customer: '',
                customerGender: 'Male' as const,
                firstName: '',
                lastName: '',
                isAllDay: false,
                repeat: 'Never',
              })
            }>
            <span className="k-icon k-i-plus-circle" />
          </button>
        </div>
        <div className="card-component">
          <Scheduler
            data={data.filter((event: any) => filterEmployee[event.employeeID ? event.employeeID : ''])}
            onDataChange={onDataChange}
            modelFields={ordersModelFields}
            group={{
              resources: ['Teams'],
            }}
            resources={[
              {
                name: 'Teams',
                data: teams
                  .filter((team) => filterEmployee[team.managerID])
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
