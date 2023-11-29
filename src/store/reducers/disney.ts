import { AnyAction } from "redux";
import { AppDispatch, AppThunk, RootState } from "../store";
import api, { Character, Info } from "@/services/disneyApi";

// Types
const types = {
  GET_CHARACTERS_START: "GET_CHARACTERS_START",
  GET_CHARACTERS_SUCCESS: "GET_CHARACTERS_SUCCESS",
  GET_CHARACTERS_ERROR: "GET_CHARACTERS_ERROR",
};

// Reducer
export default function disney(
  state = {
    characters: [] as Character[],
    info: {
      count: 0,
      totalPages: 0,
      nextPage: "",
    } as Info,
    loading: false,
    error: false,
  },
  { type, payload }: AnyAction
) {
  switch (type) {
    case types.GET_CHARACTERS_START:
      return {
        ...state,
        loading: true,
      };
    case types.GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: payload.characters,
        info: payload.info,
        loading: false,
        error: false,
      };
    case types.GET_CHARACTERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
}

// Actions
export const getCharacters =
  (params: Parameters<typeof api.getCharacters>[0]): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: types.GET_CHARACTERS_START });

    try {
      const { data, info } = await api.getCharacters(params);

      dispatch({
        type: types.GET_CHARACTERS_SUCCESS,
        payload: { characters: data, info },
      });
    } catch (error) {
      dispatch({ type: types.GET_CHARACTERS_ERROR });
    }
  };

// Selectors
export const selectCharacters = (state: RootState) => state.characters;
export const selectHasData = (state: RootState) => state.characters.length > 0;
export const selectInfo = (state: RootState) => state.info;
export const selectLoading = (state: RootState) => state.loading;
export const selectError = (state: RootState) => state.error;
