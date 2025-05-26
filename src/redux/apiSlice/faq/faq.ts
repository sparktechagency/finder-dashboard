import { api } from "@/redux/api/baseApi";

const faq = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFaqQuery } = faq;
