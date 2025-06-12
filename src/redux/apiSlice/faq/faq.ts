import { api } from "@/redux/api/baseApi";

const faq = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetFaqQuery, useCreateFaqMutation, useDeleteFaqMutation } =
  faq;
