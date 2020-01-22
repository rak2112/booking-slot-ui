import React, { FC, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Calendar from '@toast-ui/react-calendar';

import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import { config } from '../config';
import { getUuid } from '../core';

export const ToastBooker = () => {
  const today = new Date();
  const [, forceUpdate] = useState();
  const [allSchedules, setSchedules]: any = useState([]);
  const calendar: any = useRef<any>(null);

  

  useEffect(() => {
    const getSchedules = async () => {
      const { data: { data: schedules }} = await axios({
        method: 'get',
        url: `${config.slotServiceUrl}/order`,
      });
      // :TODO: need to remove the iteration and axios call.just here to test.
      schedules.forEach((item: any) => {
        item.category = 'time';
        item.start = item.startTime;
        item.dueDateClass = '';
        item.end = item.endTime;
      });
      console.log('dataaaa', schedules);
      setSchedules(schedules);
    };
    getSchedules();
    
    forceUpdate({});
  }, []);

  // data structure needed by toastUI..
  // const [allSchedules, setSchedules]: any = useState([{
  //   id: '1',
  //   calendarId: '0',
  //   title: 'TOAST UI Calendar Study',
  //   category: 'time',
  //   dueDateClass: '',
  //   start: today.toISOString(),
  //   isReadOnly: true // isReadOnly to be set by BE....
  //   // end: getDate('hours', today, 3, '+').toISOString()
  // }]);

  const createSchedule = async ({
    end: eTime, start: sTime, title
  }: any) => {
    const calendarInstance = calendar.current.calendarInst;
    const endTime = (eTime) ? new Date(Number(eTime.valueOf())).toISOString(): eTime; // send these values as milliseconds by getting end.valueOf() to store them in db as milliseconds....
    const startTime = (sTime) ? new Date(Number(sTime.valueOf())).toISOString(): sTime;

    const newSchedule = {
      id: getUuid(),
      calendarId: getUuid(),
      title,
      category: 'time',
      dueDateClass: '',
      start: startTime,
      end: endTime,
    };
    calendarInstance.createSchedules([...allSchedules, newSchedule]);
    const { id, ...rest } = newSchedule;
    console.log('newSchedule', newSchedule);
    // move the axios calls out of these methods...
    await axios({
      method: 'post',
      url: `${config.slotServiceUrl}/order`,
      headers: {'Content-Type': 'application/json' },
      data: {
        calendarId: newSchedule.calendarId,
        startTime,
        endTime,
        title,
        userId: 'userId',
        sellerId: 'sellerId1',
        vendorId: 'sellerId1',
        categoryId: 'categoryId1',
        subCategoryId: 'subCategoryId',
        price: '20',
        pricingUnit: '20',
        blockBookingUnit: '20'
      }
    });
  };

  const deleteSchedule = async ({ schedule }: any) => {
    const calendarInstance = calendar.current.calendarInst;
    calendarInstance.deleteSchedule(schedule.id, schedule.calendarId);
  };

  const updateSchedule = async ({ schedule, changes }: any)=> {
    const calendarInstance = calendar.current.calendarInst;
    calendarInstance.updateSchedule(schedule.id, schedule.calendarId, changes);
  }
 
 return (
  <Calendar
    ref={calendar}
    height="900px"
    calendars={[
      {
        id: '0',
        name: 'Private',
        bgColor: '#9e5fff',
        borderColor: '#9e5fff'
      },
      {
        id: '1',
        name: 'Company',
        bgColor: '#00a9ff',
        borderColor: '#00a9ff'
      }
    ]}
    disableDblClick={true}
    disableClick={false}
    isReadOnly={false}
    month={{
      startDayOfWeek: 0
    }}
    schedules={allSchedules}
      scheduleView
      taskView
      template={{
        milestone(schedule) { console.log('scheduleeee', schedule);
          return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
            schedule.title
          }</span>`;
        },
        milestoneTitle() { console.log('scheduleeee1');
          return 'Milestone';
        },
        allday(schedule) { console.log('scheduleeee2', schedule);
          return `${schedule.title}<i class="fa fa-refresh"></i>`;
        },
        alldayTitle() {
          return 'All Day';
        },
        popupDetailDate(isAllDay, start, end) {
          console.log('opup', isAllDay, start, end);
          return ''
        }
      }}
      onBeforeCreateSchedule = {createSchedule}
      onBeforeDeleteSchedule = {deleteSchedule}
      onBeforeUpdateSchedule = {updateSchedule}
      timezones={[
        {
          timezoneOffset: 1,
          displayLabel: 'GMT+00:00',
          tooltip: 'London'
        },
        // {
        //   timezoneOffset: -420,
        //   displayLabel: 'GMT-08:00',
        //   tooltip: 'Los Angeles'
        // }
      ]}
      useDetailPopup
      useCreationPopup
      // view={'selectedView'} // You can also set the `defaultView` option.
      week={{
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true
      }}
  />
 )
};