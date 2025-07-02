import { Button, Col, Divider, Row } from "antd";
import { SubmitHandler, FieldValues } from "react-hook-form";
import PHForm from "./form/PHForm";
import PHInput from "./form/PHInput";
import PHDatePicker from "./form/PHDatePicker";
import { TEvent } from "../types/event.type";

type TEventFormProps = {
  defaultValues?: TEvent;
  isUpdateMode?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
};

const EventForm = ({
  defaultValues,
  isUpdateMode,
  onSubmit,
}: TEventFormProps) => {
  return (
    <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <Divider>
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-transparent bg-clip-text">
          {isUpdateMode ? "Update Event" : "Create Event"}
        </h1>
      </Divider>

      <Row gutter={10}>
        <Col span={24} lg={8} md={12}>
          <PHInput type="text" name="title" label="Event Title" required />
        </Col>
        <Col span={24} lg={8} md={12}>
          <PHInput
            type="textarea"
            rows={5}
            name="description"
            label="Description"
            required
          />
        </Col>
        <Col span={24} lg={8} md={12}>
          <PHDatePicker name="dateTime" label="Date & Time" required />
        </Col>
        <Col span={24} lg={8} md={12}>
          <PHInput type="text" name="location" label="Location" required />
        </Col>
        <Col span={24} lg={8} md={12}>
          <PHInput
            type="text"
            name="organizerName"
            label="Organizer Name"
            required
          />
        </Col>
        <Col span={24} lg={8} md={12}>
          <PHInput
            type="text"
            name="organizerEmail"
            label="Organizer Email"
            required
          />
        </Col>
        <Col span={24} lg={8} md={12}>
          <PHInput
            type="number"
            name="attendeeCount"
            label="Attendee Count"
            defaultValue={0}
            required
          />
        </Col>
      </Row>
      <div className="mt-4">
        <Button type="primary" htmlType="submit">
          {isUpdateMode ? "Update Event" : "Add Event"}
        </Button>
      </div>
    </PHForm>
  );
};

export default EventForm;
