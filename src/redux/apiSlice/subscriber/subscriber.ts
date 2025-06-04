import { api } from "@/redux/api/baseApi";

const subscriber = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriber: builder.query({
      query: () => ({
        url: "/dashboard/total-subscriber",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSubscriberQuery } = subscriber;
