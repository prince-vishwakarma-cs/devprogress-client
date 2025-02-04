import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const leetcodebaseurl = import.meta.env.VITE_LEET
const backendurl = import.meta.env.VITE_SERVER
export const platformUPI = createApi({
  reducerPath: "platformAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    leetcode: builder.query({
      query: ({ username }) =>`${leetcodebaseurl}/${username}`,
    }),
    leetcodebadges: builder.query({
      query: ({ username }) =>`${leetcodebaseurl}/${username}/badges`,
    }),
    leetcodesolved: builder.query({
      query: ({ username }) =>`${leetcodebaseurl}/${username}/solved`,
    }),
    gfg: builder.query({
      query: ({ username }) => `${import.meta.env.VITE_SERVER}/gfg/${username}`,
    }),
    codeforces: builder.query({
      query: ({ username }) =>
        `https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=true`,
    }),
    codefchef: builder.query({
      query: ({ username }) =>  `https://codechef-api.vercel.app/${username}`,
    }),
  }),
});

export const {
  useCodefchefQuery,
  useGfgQuery,
  useLeetcodeQuery,
  useCodeforcesQuery,
  useLeetcodebadgesQuery,
  useLeetcodesolvedQuery
} = platformUPI;
