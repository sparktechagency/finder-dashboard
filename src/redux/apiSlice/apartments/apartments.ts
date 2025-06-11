import { api } from "@/redux/api/baseApi";

const apartments = api.injectEndpoints({
  endpoints: (builder) => ({
    getApartments: builder.query({
      query: () => ({
        url: "/apartment",
        method: "GET",
      }),
    }),
    getApartmentsDetails: builder.query({
      query: () => ({
        url: "/floor",
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

    createApartmentFloor: builder.mutation({
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
  useGetApartmentsDetailsQuery,
  useCreateApartmentMutation,
  useCreateApartmentFloorMutation,
  useDeleteApartmentMutation,
} = apartments;
