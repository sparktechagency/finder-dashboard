import { api } from "@/redux/api/baseApi";

const apartments = api.injectEndpoints({
  endpoints: (builder) => ({
    getApartments: builder.query({
      query: () => ({
        url: "/apartment",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetApartmentsQuery } = apartments;
