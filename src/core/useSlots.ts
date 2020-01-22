import React, { useReducer } from 'react';

export const useSlots = (data: any) => {
  console.log('dataaa', data);
  let selectedDayTimes: any; // TODO: typify this file
  let slots: Number[] = [];
  if(data.selectedDates) {
    const { selectedDates, service: { sessionDuration }} = data;
    const selectedDay = new Date(selectedDates.start).getDay();
    
    Object.keys(data.service.hours).map((item, index) => {
      if(index+1 === selectedDay) {
        selectedDayTimes = data.service.hours[item];
      }
    });
    
    if(selectedDayTimes) {
      let { open, close } = selectedDayTimes;
      const numberOfSlots = Math.ceil((close-open)/sessionDuration)+1; // re-check for an hours slot
      slots = [...Array(numberOfSlots)].fill(open).map((_, index)=> (index === 0) ? open : open += (+sessionDuration));
    }
  }

  return {
    selectedDayTimes,
    slots
  }
};

