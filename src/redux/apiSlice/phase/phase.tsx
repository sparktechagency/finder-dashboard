import { api } from "@/redux/api/baseApi";

const phase = api.injectEndpoints({
  endpoints: (builder) => ({
    getPhaseDetails: builder.query({
      query: () => ({
        url: `/phase`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPhaseDetailsQuery } = phase;
