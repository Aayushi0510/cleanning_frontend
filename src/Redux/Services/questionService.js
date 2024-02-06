import apiSlice from "./apiSlice";

export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionByModuleId: builder.query({
      providesTags: ["question"],
      query: (id) => ({
        url: `api/modules/${id}/questions`,
        method: "GET",
      }),
    }),
    addOrder: builder.mutation({
      invalidatesTags: ["order"],
      query: (body) => ({
        url: "api/order",
        method: "POST",
        body,
      }),
    }),
    //  getOrderById: builder.query({
    //         providesTags: ['order'],
    //         query: (id) => ({
    //             url: `api/order/${id}`,
    //             method: 'GET',
    //         }),
    //     }),
    //     getOrderByUserId: builder.query({
    //       providesTags: ['order'],
    //       query: (id) => ({
    //           url: `api/orders/${id}`,
    //           method: 'GET',
    //       }),
    //   }),
  }),
});
export const {
  useAddOrderMutation,
  useGetQuestionByModuleIdQuery,
  useGetOrderQuery,
  useGetOrderByUserIdQuery,
} = questionApi;
