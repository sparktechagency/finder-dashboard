import { api } from "../api/baseApi";

const subscriptions = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => ({
        url: "/package",
        method: "GET",
      }),
    }),

    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/package",
        method: "POST",
        body: data,
      }),
    }),

    updateSubscription: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/package/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptions;
