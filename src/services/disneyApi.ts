import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DisneyApiResult {
  info: Info;
  data?: Character[] | null;
}
export interface Info {
  count: number;
  totalPages: number;
  previousPage?: null;
  nextPage: string;
}
export interface Character {
  _id: number;
  films?: (string | null)[] | null;
  shortFilms?: null[] | null;
  tvShows?: (string | null)[] | null;
  videoGames?: (string | null)[] | null;
  parkAttractions?: (string | null)[] | null;
  allies?: null[] | null;
  enemies?: null[] | null;
  sourceUrl: string;
  name: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  url: string;
  __v: number;
}

export type FilterColumnType = "name" | "films" | "tvShows" | "videoGames";
export type FilterType = {
  type: FilterColumnType;
  value: string;
};

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
