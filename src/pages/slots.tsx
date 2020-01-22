import React, { FC, useState, useCallback, useEffect, useReducer } from 'react';
import { Modal, Button, TextField, TextContainer, Stack } from '@shopify/polaris';

import moment from 'moment';

import { useSlots } from '../core';

export const Slots: FC<any> = ({
  active,
  handleModalChange,
  ...props
}) => {
  const state = useSlots({
    service: props.service,
    selectedDates: props.selectedDates
  });
  console.log('stateeee', state);
  // const handleModalChange = useCallback(() => setActive(!active), [active]);
  const timeQuarters = ["00", "30"];

  
  
  
  const onSelection = (selectedDates: any) => {
    console.log('selectedDates', selectedDates);
  };

  const handleClose = () => {
    handleModalChange();
  };

  const onClickHandler = (timeSelected: number) => () => {
    const hours = `${Math.floor(timeSelected/60)}`;
    const minutes = `${(timeSelected%60) ? timeSelected%60: '00'}`;
    const selectedDate = moment(props.selectedDates.start);

    const date = moment({
      y: selectedDate.year(),
      M: selectedDate.month(),
      d: selectedDate.date(),
      h: +hours,
      minute: +minutes
    }).toISOString();
   // date to send to the BE 
  };

  return (
    <div style={{height: '500px'}}>
      <Modal
        open={active}
        onClose={handleClose}
        title={`Slot Booking for ${(props.selectedDates) ? moment(props.selectedDates.start).format('ll') : ''}`}
        primaryAction={{
          content: 'Book your slot',
          onAction: handleClose,
        }}
        size={'Large'}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section >
          <Stack>
            { (state.selectedDayTimes) ? 
              state.slots.map((slot: any)=> {
                // :TODO remove the inline Styles
                return <span style={{
                  'display': 'inline-block',
                  'border': '1px solid',
                  'padding': '10px',
                  'margin': '10px',
                  'background': '#00b300',
                  'width': '100px',
                  'color': '#fff',
                  'cursor': 'pointer'
                }}
                onClick={onClickHandler(slot)}>
                  {Math.floor(slot/60)} : {(slot%60) ? slot%60: '00' }
                </span>
              }) :
              <span>Service Not available on this day!!!</span>
            }
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
};