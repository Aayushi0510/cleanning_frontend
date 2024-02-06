import apiSlice from "./apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getOrder: builder.query({
    //   providesTags: ["order"],
    //   query: (body) => ({
    //     url: "api/order",
    //     method: "GET",
    //     body,
    //   }),
    // }),
    addPayemnt: builder.mutation({
      invalidatesTags: ['[payment]'],
      query: (body) => ({
          url: 'api/create-checkout-session',
          method: 'POST',
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
export const {   useAddPayemntMutation} = paymentApi;
