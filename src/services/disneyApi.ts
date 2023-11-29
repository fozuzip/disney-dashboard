import axios from "axios";

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

const disneyApi = axios.create({
  baseURL: "https://api.disneyapi.dev/",
});

type ParamType = {
  page: number;
  pageSize: number;
  filters: FilterType[];
};
const getCharacters = async ({ page, pageSize, filters }: ParamType) => {
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
  const response = await disneyApi.get<DisneyApiResult>("character", {
    params,
  });

  return response.data;
};

export default { getCharacters };
