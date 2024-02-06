import apiSlice from "./apiSlice"

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getUsers: builder.query({
            providesTags: ['user'],
            query: (body) => ({
                url: 'api/users',
                method: 'GET',
                body,
            }),
        }),


        //***** LOGIN *****/
        login: builder.mutation({
            invalidatesTags: ['user'],
            query: (body) => ({
                url: 'api/login',
                method: 'POST',
                body,
            }),
        }),

        //***** LOG OUT *****/
        // refreshToken: builder.mutation({
        //     invalidatesTags: ['user'],
        //     query: (body) => ({
        //         url: '/admin/refresh',
        //         method: 'POST',
        //         body,
        //     }),
        // }),

        //***** LOG OUT *****/
        logout: builder.mutation({
            invalidatesTags: ['user'],
            query: () => ({
                url: 'api/logout',
                method: 'GET',
            }),
        }),

        //***** LOG OUT FROM ALL DEVICES *****/
        logoutFromAll: builder.mutation({
            invalidatesTags: ['user'],
            query: (body) => ({
                url: '/user/logout',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        // addUser: builder.mutation({
        //     invalidatesTags: ['user'],
        //     query: (body) => ({
        //         url: '/user/register',
        //         method: 'POST',
        //         body,
        //     }),
        // }),

   

        // **** GET BY ID
        // getUserById: builder.query({
        //     providesTags: ['user'],
        //     query: (id) => ({
        //         url: `/${id}`,
        //         method: 'GET',
        //     }),
        // }),

   
        //***** ADD New User*****/
        addNewUser: builder.mutation({
            invalidatesTags: ['user'],
            query: (body) => ({
                url: 'api/register',
                method: 'POST',
                body,
            }),
        }),

      

        //***** Update New User *****/
     
    }),
})
export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useLoginMutation,
    useLogoutMutation,
    useLogoutFromAllMutation,
    useRefreshTokenMutation,
    useGetNewUsersQuery,
    useAddNewUserMutation
} = userApi