import { Row, Col } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EventForm from "../../components/EventForm";
import { TEvent } from "../../types/event.type";
import { useAddEventMutation } from "../../redux/features/event/eventManagement.api";
import { toast } from "sonner";
import { TError } from "../../types";

const AddEvent = () => {
  const [addEvent] = useAddEventMutation();

  const handleAddSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Event...");
    const eventData = {
      ...data,
      attendeeCount: Number(data.attendeeCount),
    };

    const res = await addEvent(eventData as TEvent);

    if (res?.data?.success) {
      toast.success(res.data.message, { id: toastId, duration: 3000 });
    } else if (res?.error) {
      toast.error((res?.error as TError)?.data.message, {
        id: toastId,
        duration: 8000,
      });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <EventForm onSubmit={handleAddSubmit} />
      </Col>
    </Row>
  );
};

export default AddEvent;
