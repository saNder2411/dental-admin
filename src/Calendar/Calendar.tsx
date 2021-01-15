import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Scheduler } from '../_sections';
import { CalendarTopControlItem, CalendarHeaderCardCell } from './CalendarItems';
import { Loader, LoaderDataItem } from '../_components';
// Styled Components
import * as SC from './CalendarStyled/CalendarStyled';
// Selectors
import { selectSelectedDate, selectSelectedView } from '../_bus/Scheduler/SchedulerSelectors';
import { selectAppointmentsAllIds } from '../_bus/Entities/EntitiesSelectors';
// Action Creators
import { changeMapTeamToFilteredAC, addNewItemToEditFormAC } from '../_bus/Scheduler/SchedulerAC';
// Hooks
import { useSelectAppointmentsData, useSelectBindDataLengthForAgenda, useFetchAgendaData } from '../Agenda/AgendaHooks';
import { useStaffDataForScheduler } from './CalendarHooks';
// Helpers
import { customModelFields, getInitDataForNewDataItem } from '../_sections/Scheduler/SchedulerHelpers';

export const Calendar: FC = () => {
  const localizationService = useLocalization();
  const { appointmentsData, isDataLoading } = useSelectAppointmentsData();
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const dispatch = useDispatch();
  useFetchAgendaData(appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength, dispatch);

  const { staffData, mapTeamToFiltered } = useStaffDataForScheduler();

  const selectedDate = useSelector(selectSelectedDate);
  const selectedView = useSelector(selectSelectedView);
  const initDataForNewDataItem = getInitDataForNewDataItem(selectedDate, selectedView, 1);
  const [isAgendaDataItemLoading, setIsAgendaDataItemLoading] = useState(false);
  const appointmentsAllIDs = useSelector(selectAppointmentsAllIds);

  const onEmployeeClick = useCallback((employeeID: number) => () => dispatch(changeMapTeamToFilteredAC(employeeID)), [dispatch]);

  const onAddNewItemClick = () => dispatch(addNewItemToEditFormAC(initDataForNewDataItem, appointmentsAllIDs));

  const contentTSX = !isDataLoading && (
    <div className="card-container grid position-relative">
      <LoaderDataItem isLoading={isAgendaDataItemLoading} />
      <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')}</h3>
      <div className="card-control-wrapper">
        {staffData.map((employee) => (
          <CalendarTopControlItem
            key={employee.ID}
            isFiltered={!mapTeamToFiltered[employee.ID]}
            cardColor={employee.CalendarColHex}
            onEmployeeClick={onEmployeeClick(employee.ID)}
            fullName={employee.FullName}
          />
        ))}
      </div>
      <div className="Calendar__addNewItemWrapper">
        <span className="Calendar__addNewItemTitle">New Appointment</span>
        <button title="Add new" className="k-button" onClick={onAddNewItemClick}>
          <span className="k-icon k-i-plus-circle" />
        </button>
      </div>
      <div className="card-component">
        <Scheduler
          data={appointmentsData}
          modelFields={customModelFields}
          setIsAgendaDataItemLoading={setIsAgendaDataItemLoading}
          group={{
            resources: ['Teams'],
            orientation: 'horizontal',
          }}
          resources={[
            {
              name: 'Teams',
              data: staffData
                .filter(({ ID }) => mapTeamToFiltered[ID])
                .map((item) => ({
                  ...item,
                  text: (
                    <CalendarHeaderCardCell
                      cardColor={item.CalendarColHex}
                      employeeImage={item.TeamProfilePhotoUrl}
                      fullName={item.FullName}
                      jobTitle={item.JobTitle}
                    />
                  ),
                })),
              field: 'TeamID',
              valueField: 'ID',
              textField: 'text',
              colorField: 'CalendarColHex',
            },
          ]}
        />
      </div>
    </div>
  );

  return (
    <SC.Calendar>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </SC.Calendar>
  );
};
