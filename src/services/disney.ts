import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DisneyApiResult } from "./types";

// Define a service using a base URL and expected endpoints
export const disneyApi = createApi({
  reducerPath: "disneyApi",
  // TODO: Get from env
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.disneyapi.dev/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query<DisneyApiResult, string>({
      query: () => `character?page=60&pageSize=50`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCharactersQuery } = disneyApi;
