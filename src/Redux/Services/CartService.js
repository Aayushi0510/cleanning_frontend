import apiSlice from "./apiSlice"

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCartDetail: builder.query({
            providesTags: ['cart'],
            query: (id) => ({
               url: `api/cart/${id}`,
                   method: 'GET',
            }),
        }),




   
        addToCart: builder.mutation({
            invalidatesTags: ['cart'],
            query: (body) => ({
                url: 'api/add-to-cart',
                method: 'POST',
                body,
            }),
        }),

      

        //***** Update New User *****/
     
    }),
})
export const {
   useAddToCartMutation,
   useGetCartDetailQuery
} = cartApi