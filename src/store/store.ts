import { createStore, applyMiddleware, AnyAction } from "redux";
import thunkMiddlare, { ThunkAction } from "redux-thunk";

import disney from "./reducers/disney";

export const store = createStore(
  disney,
  undefined,
  applyMiddleware(thunkMiddlare)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
