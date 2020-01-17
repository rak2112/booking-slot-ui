import React, { FC, useState, useCallback } from 'react';
import { Modal, Button } from '@shopify/polaris';


export const Slots: FC<any> = ({
  active,
  handleModalChange
}) => {

  const [selectedExport, setSelectedExport] = useState([]);
  const [selectedExportAs, setSelectedExportAs] = useState([]);

  // const handleModalChange = useCallback(() => setActive(!active), [active]);

  const onSelection = (selectedDates: any) => {
    console.log('selectedDates', selectedDates);
  };

  const handleClose = () => {
    handleModalChange();
  };

  const handleSelectedExport = useCallback(
    (value) => setSelectedExport(value),
    [],
  );

  const handleSelectedExportAs = useCallback(
    (value) => setSelectedExportAs(value),
    [],
  );

  return (
    <div style={{height: '500px'}}>
      <Modal
        open={active}
        onClose={handleClose}
        title="Slot Booking"
        primaryAction={{
          content: 'Book your slot',
          onAction: handleClose,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          Content of the modal to go here...
        </Modal.Section>
      </Modal>
    </div>
  );
};