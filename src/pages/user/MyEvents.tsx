// pages/MyEvents/index.tsx
import {
  useDeleteEventMutation,
  useGetMyEventsQuery,
} from "../../redux/features/event/eventManagement.api";
import EventCard from "../../components/EventCard";
import { Button, Popconfirm, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TEvent } from "../../types/event.type";
import { toast } from "sonner";
import { TError } from "../../types";

const MyEvents = () => {
  const { data: myEventsData, isLoading } = useGetMyEventsQuery(undefined);

  // const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const events = myEventsData?.data as TEvent[];

  const handleUpdate = (eventId: string) => {
    console.log("Update event:", eventId);
    // Show modal or navigate to update page
  };

  const handleDelete = async (eventId: string) => {
    const toastId = toast.loading("Deleting Event...");

    const res = await deleteEvent(eventId);

    if (res?.data?.success) {
      toast.success(res?.data.message, { id: toastId, duration: 4000 });
    } else if (res?.error) {
      toast.error((res?.error as TError)?.data?.message, {
        id: toastId,
        duration: 4000,
      });
    }
  };

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-transparent bg-clip-text">
        My Events
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              footerButtons={
                <>
                  <Button
                    icon={<EditOutlined />}
                    type="default"
                    onClick={() => handleUpdate(event._id)}
                  >
                    Update
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to delete this event?"
                    onConfirm={() => handleDelete(event._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<DeleteOutlined />} type="primary" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
