// components/EventCard.tsx
import { Button, Card } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import moment from "moment";
import { TEvent } from "../types/event.type";

type Props = {
  event: TEvent;
};

const EventCard = ({ event }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card
        title={event.title}
        className="shadow-md rounded-xl border border-gray-200"
        extra={
          <Button type="primary" shape="round">
            Join Event
          </Button>
        }
      >
        <p className="text-gray-600 mb-2">
          <UserOutlined className="mr-2" />
          <span className="font-medium">Posted by:</span> {event.organizerName}
        </p>
        <p className="text-gray-600 mb-2">
          <CalendarOutlined className="mr-2" />
          <span className="font-medium">Date:</span>{" "}
          {moment(event.dateTime).format("MMMM Do YYYY, h:mm A")}
        </p>
        <p className="text-gray-600 mb-2">
          <EnvironmentOutlined className="mr-2" />
          <span className="font-medium">Location:</span> {event.location}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Description:</span> {event.description}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Attendees:</span> {event.attendeeCount}
        </p>
      </Card>
    </motion.div>
  );
};

export default EventCard;
