import { api } from "@/redux/api/baseApi";

const apartments = api.injectEndpoints({
  endpoints: (builder) => ({
    getApartments: builder.query({
      query: () => ({
        url: "/apartment",
        method: "GET",
      }),
    }),

    createApartment: builder.mutation({
      query: (data) => ({
        url: "/apartment/create",
        method: "POST",
        body: data,
      }),
    }),

    createApartmentDetails: builder.mutation({
      query: (data) => ({
        url: "/floor/create",
        method: "POST",
        body: data,
      }),
    }),

    deleteApartment: builder.mutation({
      query: (id) => ({
        url: `/apartment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetApartmentsQuery,
  useCreateApartmentMutation,
  useCreateApartmentDetailsMutation,
  useDeleteApartmentMutation,
} = apartments;
