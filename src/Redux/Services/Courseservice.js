import apiSlice from "./apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      providesTags: ["course"],
      query: (body) => ({
        url: "api/courses",
        method: "GET",
        body,
      }),
    }),

    getCourseDetailByModuleId: builder.query({
      providesTags: ["course"],
      query: ({ courseId, moduleId }) => ({
        url: `api/course/${courseId}/module/${moduleId}`,
        method: "GET",
      }),
    }),

    addCourse: builder.mutation({
      invalidatesTags: ['course'],
      query: (body) => ({
          url: 'api/course',
          method: 'POST',
          body,
      }),
  }),
     getCourseById: builder.query({
            providesTags: ['course'],
            query: (id) => ({
                url: `api/course/${id}`,
                method: 'GET',
            }),
        }),
  }),
});
export const { useGetCourseQuery  ,useGetCourseByIdQuery ,useGetCourseDetailByModuleIdQuery} = courseApi;
