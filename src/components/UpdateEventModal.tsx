import { Modal } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EventForm from "./EventForm";
import { TEvent } from "../types/event.type";
import { toast } from "sonner";
import { useUpdateEventMutation } from "../redux/features/event/eventManagement.api";
import { TError } from "../types";

type TUpdateEventModalProps = {
  open: boolean;
  onClose: () => void;
  event: TEvent;
};

const UpdateEventModal = ({ open, onClose, event }: TUpdateEventModalProps) => {
  const [updateEvent] = useUpdateEventMutation();

  const handleUpdateSubmit: SubmitHandler<FieldValues> = async (data) => {

    const toastId = toast.loading("Updating...");
    const eventData = {
      ...data,
      attendeeCount: Number(data.attendeeCount),
    };

    const res = await updateEvent(eventData as TEvent);


    if (res?.data?.success) {
      toast.success(res.data.message, { id: toastId, duration: 3000 });
    } else if (res?.error) {
      toast.error((res?.error as TError)?.data.message, {
        id: toastId,
        duration: 8000,
      });
    }
    onClose();
  };

  return (
    <Modal
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
