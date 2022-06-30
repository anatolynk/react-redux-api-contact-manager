import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { apiRequestFail, apiRequestStart } from "./api";

// import moment from "moment";

const initialState = {
  list: [],
  loading: false,
  cachingLastFetch: null,
  notification: {
    type: "",
    loading: false,
    message: "",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sendNotification: (users, action) => {
      const { loading, message, type } = action.payload;
      users.notification.loading = loading;
      users.notification.message = message;
      users.notification.type = type;
    },

    getUsersRequested: (users, action) => {
      users.loading = true;
    },
    getUsersRequestedFail: (users, action) => {
      users.loading = false;
    },
    getUsersReceived: (users, action) => {
      // Data received - hide spinner
      users.loading = false;

      // Load Data from API into Store
      users.list = action.payload;

      // Timestamp for last successful fething event
      users.cachingLastFetch = Date.now();
    },

    getUserByIdReceived: (users, action) => {
      // Data received - hide spinner
      users.loading = false;

      // Load Data from API into Store
      users.list = action.payload;

      // Timestamp for last successful fething event
      users.cachingLastFetch = Date.now();
    },

    addUser: (users, action) => {
      const { name, email, phone, company } = action.payload;
      users.list.push({
        name,
        email,
        phone,
        company,
      });
    },

    editUser: (users, action) => {
      const { id, name, email, phone, company, avatar } =
        action.payload;
      const currentUser = users.list.find((user) => user.id === id);
      if (currentUser) {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.phone = phone;
        currentUser.company = company;
        currentUser.avatar = avatar;
      }
    },

    deleteUser: (users, action) => {
      const { id } = action.payload;

      const index = users.list.findIndex((user) => user.id === id);

      if (index !== -1) users.list.splice(index, 1);
    },

    setToggleUser: (users, action) => {
      const { id, favorite, hidden } = action.payload;

      const index = users.list.findIndex((user) => user.id === id);
      users.list[index].favorite = favorite;
      users.list[index].hidden = hidden;
    },
  },
});

//
export const {
  addUser,
  editUser,
  deleteUser,
  getUsersReceived,
  getUsersRequested,
  getUsersRequestedFail,
  setToggleUser,
  getUserByIdReceived,
  sendNotification,
} = usersSlice.actions;

// Api Action Creators
const url = "/users";

export const addUserToList = (user) =>
  apiRequestStart({
    url,
    method: "post",
    data: user,
    onSuccess: addUser.type,
  });

export const editUserFromList = (user) => {
  const { id, name, email, phone, company, avatar } = user;
  return apiRequestStart({
    url: url + "/" + id,
    method: "patch",
    data: {
      name,
      email,
      phone,
      company,
      avatar: `${avatar}`,
    },
    onSuccess: editUser.type,
  });
};

export const deleteUserFromList = (id) =>
  apiRequestStart({
    url: url + "/" + id,
    method: "delete",
    data: { id },
    onSuccess: deleteUser.type,
  });

export const setUserAsToggle = (id, toggleName, toggleStatus) =>
  apiRequestStart({
    url: url + "/" + id,
    method: "patch",
    data: {
      [toggleName]: toggleStatus,
    },
    onSuccess: setToggleUser.type,
  });

export const getUserById = (id) => {
  apiRequestStart({
    url: url + "/" + id,
    onStart: getUsersRequested.type,
    onSuccess: getUserByIdReceived.type,
    onError: getUsersRequestedFail.type,
  });
};

export const getUsersList = () => (dispatch, state) => {
  // Cashing - Basic Implementation
  // if from last fetch past less than 5 seconds we don't call Api Request
  // const cachingInSeconds = 5;
  // const { cachingLastFetch } = state().usersSlice;
  // const differenceInSeconds = moment().diff(
  //   moment(cachingLastFetch),
  //   "seconds"
  // );

  // if (differenceInSeconds < cachingInSeconds) return;

  return dispatch(
    apiRequestStart({
      url,
      onStart: getUsersRequested.type,
      onSuccess: getUsersReceived.type,
      onError: getUsersRequestedFail.type,
    })
  );
};

export default usersSlice.reducer;
