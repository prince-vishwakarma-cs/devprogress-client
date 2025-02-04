import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ userId, name, password }) => ({
        url: "new", // This should be your registration endpoint
        method: "POST",
        body: {
          _id: userId,
          name,
          password,
        },
      }),
      invalidatesTags: ["User"]
    }),
    login: builder.mutation({
      query: ({ userId, password }) => ({
        url: "login",
        method: "POST",
        body: {
          _id: userId,
          password,
        },
      }),
      invalidatesTags: ["User"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      providesTags:["User"]
    }),
    update:builder.mutation({
      query:(formdata)=>({
        url:"/update",
        method:"POST",
        body:formdata
      })
    }),
    getUser: builder.query({
      query: () => "/",
      providesTags: ["User"]
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery,useUpdateMutation ,useLogoutMutation} =
  userAPI;
