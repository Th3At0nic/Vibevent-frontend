// // components/EventCard.tsx
// import { Button, Card, Tooltip } from "antd";
// import {
//   CalendarOutlined,
//   EnvironmentOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { motion } from "framer-motion";
// import moment from "moment";
// import {
//   TEvent,
//   TJoinedError,
//   TJoinedEventResponse,
// } from "../types/event.type";
// import { useJoinEventMutation } from "../redux/features/event/eventManagement.api";
// import { toast } from "sonner";
// import { useAppSelector } from "../redux/hooks";
// import { currentUser } from "../redux/features/auth/authSlice";

// type Props = {
//   event: TEvent;
// };

// const EventCard = ({ event }: Props) => {
//   const user = useAppSelector(currentUser);

//   const userEmail = user?.userEmail;

//   const [joinEvent] = useJoinEventMutation();

//   const joinEventHandler = async (eventId: string) => {
//     const toastId = toast.loading("Joining...");

//     const res = await joinEvent(eventId);

//     if ((res?.data as TJoinedEventResponse)?.success) {
//       toast.success(res.data.message, { id: toastId, duration: 2000 });
//     } else if (res?.error) {
//       toast.error((res.error as TJoinedError)?.data.message, {
//         id: toastId,
//         duration: 2000,
//       });
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//       className="w-full"
//     >
//       <Card
//         title={event.title}
//         className="shadow-md rounded-xl border border-gray-200"
//         extra={
//           <Tooltip
//             title={
//               event.joinedUsers.includes(userEmail as string)
//                 ? "You have already joined this event"
//                 : ""
//             }
//           >
//             <span>
//               {" "}
//               {/* Needed for Tooltip to work with disabled buttons */}
//               <Button
//                 type="primary"
//                 shape="round"
//                 onClick={() => joinEventHandler(event._id)}
//                 disabled={event.joinedUsers.includes(userEmail as string)}
//               >
//                 Join Event
//               </Button>
//             </span>
//           </Tooltip>
//         }
//       >
//         <p className="text-gray-600 mb-2">
//           <UserOutlined className="mr-2" />
//           <span className="font-medium">Posted by:</span> {event.organizerName}
//         </p>
//         <p className="text-gray-600 mb-2">
//           <CalendarOutlined className="mr-2" />
//           <span className="font-medium">Date:</span>{" "}
//           {moment(event.dateTime).format("MMMM Do YYYY, h:mm A")}
//         </p>
//         <p className="text-gray-600 mb-2">
//           <EnvironmentOutlined className="mr-2" />
//           <span className="font-medium">Location:</span> {event.location}
//         </p>
//         <p className="text-gray-600 mb-2">
//           <span className="font-medium">Description:</span> {event.description}
//         </p>
//         <p className="text-gray-600">
//           <span className="font-medium">Attendees:</span> {event.attendeeCount}
//         </p>
//       </Card>
//     </motion.div>
//   );
// };

// export default EventCard;

import { Button, Card, Tooltip } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import moment from "moment";
import { TEvent, TJoinedError, TJoinedEventResponse } from "../types/event.type";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import { useJoinEventMutation } from "../redux/features/event/eventManagement.api";
import { toast } from "sonner";

type Props = {
  event: TEvent;
  footerButtons?: React.ReactNode; //reused this component in to page, so to make this dynamic, new prop for flexibility
};

const EventCard = ({ event, footerButtons }: Props) => {
  const user = useAppSelector(currentUser);

  const userEmail = user?.userEmail;

  const [joinEvent] = useJoinEventMutation();

  const joinEventHandler = async (eventId: string) => {
    const toastId = toast.loading("Joining...");

    const res = await joinEvent(eventId);

    if ((res?.data as TJoinedEventResponse)?.success) {
      toast.success(res.data.message, { id: toastId, duration: 2000 });
    } else if (res?.error) {
      toast.error((res.error as TJoinedError)?.data.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

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
          !footerButtons && (
            <Tooltip
              title={
                event.joinedUsers.includes(userEmail as string)
                  ? "You have already joined this event"
                  : ""
              }
            >
              <span>
                {" "}
                {/* Needed for Tooltip to work with disabled buttons */}
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => joinEventHandler(event._id)}
                  disabled={event.joinedUsers.includes(userEmail as string)}
                >
                  Join Event
                </Button>
              </span>
            </Tooltip>
          )
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
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Attendees:</span> {event.attendeeCount}
        </p>

        {footerButtons && (
          <div className="flex justify-end gap-3 ">{footerButtons}</div>
        )}
      </Card>
    </motion.div>
  );
};

export default EventCard;
