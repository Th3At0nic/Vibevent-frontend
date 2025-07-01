import { Row, Col } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EventForm from "../../components/EventForm";

const AddEvent = () => {
  const handleAddSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Add Event Submitted:", data);
    // mutation here later
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
