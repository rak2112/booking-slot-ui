import React, { FC, useState, useCallback } from 'react';
import { DatePicker } from '@shopify/polaris';

export const McCalendar: FC<any> = ({ onSelection }) => {
  const [{month, year}, setDate] = useState({
    month: 1,
    year: 2018,
  });
  
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });

  const onChangeSelected = (values: any) => {
    setSelectedDates(values);
    onSelection(values);
  }

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={onChangeSelected}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
      allowRange= {false}
    />
  );
};