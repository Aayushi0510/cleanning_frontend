import apiSlice from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      providesTags: ["order"],
      query: (body) => ({
        url: "api/order",
        method: "GET",
        body,
      }),
    }),
    addOrder: builder.mutation({
      invalidatesTags: ['order'],
      query: (body) => ({
          url: 'api/order',
          method: 'POST',
          body,
      }),
  }),
     getOrderById: builder.query({
            providesTags: ['order'],
            query: (id) => ({
                url: `api/order/${id}`,
                method: 'GET',
            }),
        }),
        getOrderByUserId: builder.query({
          providesTags: ['order'],
          query: (id) => ({
              url: `api/orders/${id}`,
              method: 'GET',
          }),
      }),
  }),
});
export const {   useAddOrderMutation ,useGetOrderByIdQuery ,useGetOrderQuery ,useGetOrderByUserIdQuery} = orderApi;
