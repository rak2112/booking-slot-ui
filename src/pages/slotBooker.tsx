import React, { FC, useState, useCallback } from 'react';
import { DatePicker } from '@shopify/polaris';
import { McCalendar, Slots } from  './';

export const SlotBooker: FC = () => {
  const [active, setActive] = useState(true);
  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const onSelection = (selectedDates: any) => {
    console.log('selectedDates', selectedDates);
    setActive(!active);
  };

  const handleClose = () => {
    handleModalChange();
  };

  return (
    <>
      <McCalendar onSelection={onSelection}/>
      <Slots active={active} handleModalChange= {handleModalChange}/>
    </>
    
  );
};