import axios from "axios";
import * as apiActions from "../api";

// const API_ENDPOINT = "http://localhost:3001/";
const API_ENDPOINT = process.env.REACT_APP_API_URL;

const apiRequestStructure = {
  type: "apiRequest",
  payload: {
    url: "/users",
    method: "get",
    data: {},
    onSuccess: "apiRequestSuccess",
    onError: "apiRequestFail",
  },
};

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const api = (store) => (next) => async (action) => {
  if (action.type !== apiActions.apiRequestStart.type) {
    // if it's not an API Request, go to Next Middleware
    return next(action);
  }

  const { url, method, data, onStart, onSuccess, onError } =
    action.payload;

  // Start loading data -  onStart action
  // dispatch an action
  //  - getUsersRequested
  //  - loading: true

  if (onStart) store.dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: API_ENDPOINT,
      url,
      method,
      headers,
      data,
      params: {
        data,
      },
    });

    // General Success Actions

    // when we send axios delete request, then we should return data from params
    // because it doesn't return data in response.
    if (method === "delete")
      response.data = response.config.params.data;

    store.dispatch(apiActions.apiRequestSuccess(response.data));

    // ApiRequest Success
    if (onSuccess)
      store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General Error Actions
    store.dispatch(apiActions.apiRequestFail(error.message));

    // ApiRequest Fail Specific Error Action
    if (onError)
      store.dispatch({
        type: onError,
        payload: error?.message || "Error",
      });
  }
};

export default api;
