import { TEvent } from "../../../types/event.type";
import { baseApi } from "../../api/baseApi";

const eventManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: (filters) => {
        // Build query object conditionally
        const queryObject = {
          ...(filters.title ? { searchTerm: filters.title } : {}),
          ...(filters.date ? { eventDate: filters.date } : {}),
          ...(filters.range ? { dateFilter: filters.range } : {}),
        };

        // Convert to URL query string
        const params = new URLSearchParams(queryObject).toString();

        return {
          url: `/events?${params}`,
          method: "GET",
        };
      },
      providesTags: ["allEvents"],
    }),
    getMyEvents: builder.query({
      query: (filters) => {
        // Build query object conditionally
        const queryObject = {
          ...(filters.title ? { searchTerm: filters.title } : {}),
          ...(filters.date ? { eventDate: filters.date } : {}),
          ...(filters.range ? { dateFilter: filters.range } : {}),
        };

        // Convert to URL query string
        const params = new URLSearchParams(queryObject).toString();

        return {
          url: `/events/my-events?${params}`,
          method: "GET",
        };
      },
      providesTags: ["myEvents"],
    }),

    joinEvent: builder.mutation({
      query: (eventId: string) => ({
        url: `/events/${eventId}/join`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["allEvents", "myEvents"],
    }),
    deleteEvent: builder.mutation({
      query: (eventId: string) => ({
        url: `/events/${eventId}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["allEvents", "myEvents"],
    }),
    updateEvent: builder.mutation({
      query: (data: TEvent) => ({
        url: `/events/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["allEvents", "myEvents"],
    }),
    addEvent: builder.mutation({
      query: (data: TEvent) => ({
        url: `/events/add-event`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allEvents", "myEvents"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useJoinEventMutation,
  useGetMyEventsQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useAddEventMutation,
} = eventManagementApi;
