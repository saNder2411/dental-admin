import React, { FC, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Scheduler } from '../_sections';
import { CalendarTopControlItem, CalendarHeaderCardCell } from './CalendarItems';
import { Loader, LoaderDataItem } from '../_components';
// Styled Components
import * as SC from './CalendarStyled/CalendarStyled';
// Selectors
import { selectMemoData, selectSelectedDate, selectSelectedView } from '../_sections/Scheduler/SchedulerSelectors';
// Actions
import { SchedulerActions } from '../_sections/Scheduler/SchedulerActions';
// Hooks
import { useTeamStaffDataForScheduler } from './CalendarHooks';
import { useSelectAppointmentsData, useSelectBindDataLengthForAgenda, useFetchAgendaData } from '../Agenda/AgendaHooks';
import { useSetSchedulerDataForDomainWithDataBind } from '../_sections/Scheduler/SchedulerHooks';
// Helpers
import { customModelFields, getInitDataForNewDataItem } from '../_sections/Scheduler/SchedulerHelpers';

export const Calendar: FC = () => {
  const localizationService = useLocalization();
  const { appointmentsData, isDataLoading } = useSelectAppointmentsData();
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();

  const [isAgendaDataItemLoading, setIsAgendaDataItemLoading] = useState(false);
  const dispatch = useDispatch();
  const { teamData, mapTeamToFiltered } = useTeamStaffDataForScheduler();
  const selectData = useMemo(selectMemoData, []);
  const data = useSelector(selectData);
  const calendarData = useMemo(() => data.filter(({ LookupHR01teamId }) => mapTeamToFiltered[LookupHR01teamId]), [data, mapTeamToFiltered]);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedView = useSelector(selectSelectedView);
  const initDataForNewDataItem = getInitDataForNewDataItem(selectedDate, selectedView, calendarData[0]?.LookupHR01teamId ?? 1);

  useFetchAgendaData(appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength, dispatch);
  useSetSchedulerDataForDomainWithDataBind(appointmentsData, isDataLoading, SchedulerActions, dispatch);

  const onEmployeeClick = useCallback((employeeID: number) => SchedulerActions.onEmployeeChange(dispatch, employeeID), [dispatch]);

  const onAddNewItemClick = () => SchedulerActions.addNewItemToEdit(dispatch, initDataForNewDataItem);

  const contentTSX = appointmentsData.length > 0 && !isDataLoading && (
    <div className="card-container grid position-relative">
      <LoaderDataItem isLoading={isAgendaDataItemLoading} />
      <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')}</h3>
      <div className="card-control-wrapper">
        {teamData.map((employee) => (
          <CalendarTopControlItem
            key={employee.ID}
            isFiltered={!mapTeamToFiltered[employee.ID]}
            cardColor={employee.CalendarColHex}
            onEmployeeClick={() => onEmployeeClick(employee.ID)}
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
          data={calendarData}
          modelFields={customModelFields}
          setIsAgendaDataItemLoading={setIsAgendaDataItemLoading}
          group={{
            resources: ['Teams'],
            orientation: 'horizontal',
          }}
          resources={[
            {
              name: 'Teams',
              data: teamData
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
