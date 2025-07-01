// components/event/UpdateEventModal.tsx
import { Modal } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EventForm from "./EventForm";
import { TEvent } from "../types/event.type";

type TUpdateEventModalProps = {
  open: boolean;
  onClose: () => void;
  event: TEvent;
};

const UpdateEventModal = ({ open, onClose, event }: TUpdateEventModalProps) => {
  const handleUpdateSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Update Event Submitted:", data);
    onClose();
  };

  return (
    <Modal
      title="Update Event"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={1200}
    >
      <EventForm
        onSubmit={handleUpdateSubmit}
        isUpdateMode={true}
        defaultValues={event}
      />
    </Modal>
  );
};

export default UpdateEventModal;
