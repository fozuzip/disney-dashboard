import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DisneyApiResult, FilterType } from "./types";

// Define a service using a base URL and expected endpoints
export const disneyApi = createApi({
  reducerPath: "disneyApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://api.disneyapi.dev/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      DisneyApiResult,
      { page: number; pageSize: number; filters: FilterType[] }
    >({
      query: ({ page, pageSize, filters }) => {
        const params = filters.reduce(
          (params, filter) => {
            if (!filter.value) return params;

            return {
              ...params,
              [filter.type]: filter.value,
            };
          },
          { page, pageSize }
        );
        return {
          url: "character",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCharactersQuery } = disneyApi;
