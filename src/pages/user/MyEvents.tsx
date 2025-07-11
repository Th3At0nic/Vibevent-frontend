import {
  useDeleteEventMutation,
  useGetMyEventsQuery,
} from "../../redux/features/event/eventManagement.api";
import EventCard from "../../components/EventCard";
import { Button, Divider, Popconfirm, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TEvent } from "../../types/event.type";
import { toast } from "sonner";
import { TError } from "../../types";
import { useState } from "react";
import UpdateEventModal from "../../components/UpdateEventModal";
import EventFilterBar, { TEventFilters } from "../../components/EventFilterBar";
import { NoDataCard } from "../../utils/NoDataCard";

const MyEvents = () => {
  const [filters, setFilters] = useState<TEventFilters>({});

  const handleFilterChange = (updatedFilters: TEventFilters) => {
    setFilters(updatedFilters);
  };

  const queryParams = {
    title: filters.title,
    date: filters.date,
    range: filters.range,
  };

  const { data: myEventsData, isLoading } = useGetMyEventsQuery(queryParams);
  const events = myEventsData?.data as TEvent[];

  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const handleUpdate = (eventId: string) => {
    const eventToUpdate = events?.find((e) => e._id === eventId);
    if (eventToUpdate) {
      setSelectedEvent(eventToUpdate);
      setIsModalOpen(true);
    }
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  }

  if (!events || myEventsData.length === 0)
    return (
      <NoDataCard
        title="No Events Available"
        description="You haven't created any events yet. Start by adding your first one."
      />
    );

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Divider>
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-transparent bg-clip-text">
          My Events
        </h1>
      </Divider>

      <div className="lg:mx-70 lg:my-10">
        <EventFilterBar onFilterChange={handleFilterChange} />
      </div>

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
      {selectedEvent && (
        <UpdateEventModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default MyEvents;
