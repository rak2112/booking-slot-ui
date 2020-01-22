import React, { FC, useEffect, useState, useCallback } from 'react';
import { DatePicker } from '@shopify/polaris';
import axios from 'axios';

import { McCalendar, Slots } from  './';
import { config } from '../config';

export const SlotBooker: FC = () => {
  const [active, setActive] = useState(true);
  const [currentService, setService] = useState();
  const [selectedDates, setSelectedDates] = useState();
  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const getSchedules = async () => {
    const { data: { data: service }} = await axios({
      method: 'get',
      url: `${config.slotServiceUrl}/slot-services`,
    });
    // for now just taking one slot to complete the journey...
    setService(service[0]);
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const onSelection = (selectedDates: any) => {
    setSelectedDates(selectedDates);
    setActive(!active);
  };

  const handleClose = () => {
    handleModalChange();
  };

  return (
    <>
      <McCalendar onSelection={onSelection}/>
      <Slots 
        active={active}
        selectedDates={selectedDates}
        service={currentService}
        handleModalChange= {handleModalChange}/>
    </>
    
  );
};