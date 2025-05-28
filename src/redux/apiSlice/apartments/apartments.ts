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
  }),
});

export const { useGetApartmentsQuery, useCreateApartmentMutation } = apartments;
