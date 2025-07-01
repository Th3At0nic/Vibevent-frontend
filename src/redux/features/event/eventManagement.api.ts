import { TEvent } from "../../../types/event.type";
import { baseApi } from "../../api/baseApi";

const eventManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllStudents: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: "/students",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["students"],
    //   transformResponse: (response: TResponseRedux<TStudent[]>) => {
    //     return {
    //       data: response?.data,
    //       meta: response?.meta,
    //     };
    //   },
    // }),
    // getAStudent: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `/students/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TStudent>) => {
    //     return {
    //       data: response?.data,
    //       meta: response?.meta,
    //     };
    //   },
    // }),
    // addStudent: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/create-student",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["students"],
    // }),
    // updateStudent: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/students/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["students"],
    // }),
    getAllEvents: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters?.title) params.append("searchTerm", filters.title);
        if (filters?.date) params.append("eventDate", filters.date);
        if (filters?.range) params.append("dateFilter", filters.range);

        return {
          url: `/events?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["allEvents"],
    }),

    getMyEvents: builder.query({
      query: () => ({
        url: `/events/my-events`,
        method: "GET",
      }),
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
  }),
});

export const {
  useGetAllEventsQuery,
  useJoinEventMutation,
  useGetMyEventsQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = eventManagementApi;
