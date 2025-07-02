import { useGetAllEventsQuery } from "../../redux/features/event/eventManagement.api";
import EventCard from "../../components/EventCard";
import { Divider, Spin } from "antd";
import { TEvent } from "../../types/event.type";
import { useState } from "react";
import EventFilterBar, { TEventFilters } from "../../components/EventFilterBar";

const Events = () => {
  const [filters, setFilters] = useState<TEventFilters>({});

  const handleFilterChange = (updatedFilters: TEventFilters) => {
    setFilters(updatedFilters);
  };

  const queryParams = {
    title: filters.title,
    date: filters.date,
    range: filters.range,
  };

  const { data: eventsData, isLoading } = useGetAllEventsQuery(queryParams);

  const events = eventsData?.data as TEvent[]; // safe cast

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Divider>
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-transparent bg-clip-text">
          All Events
        </h1>
      </Divider>

      <div className="lg:mx-70 lg:my-10">
        <EventFilterBar onFilterChange={handleFilterChange} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
