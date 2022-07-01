const notification = (store) => (next) => (action) => {
  if (action.type === "api/requestFail") {
    ///
    store.dispatch({
      type: "users/sendNotification",
      payload: {
        loading: false,
        message: "Error: Something went wrong",
      },
    });
  }

  if (
    action.type === "toggle" ||
    action.type === "add" ||
    action.type === "delete" ||
    action.type === "edit"
  ) {
    store.dispatch({
      type: "users/sendNotification",
      payload: {
        loading: true,
        message: "Working...",
      },
    });
  }

  if (action.type.includes("setToggleUser")) {
    store.dispatch({
      type: "users/sendNotification",
      payload: {
        loading: false,
        message: "Contact has been updated",
      },
    });
    next(action);
  }

  if (action.type.includes("deleteUser")) {
    store.dispatch({
      type: "users/sendNotification",
      payload: {
        loading: false,
        message: "Contact has been deleted",
      },
    });
  }

  if (action.type.includes("editUser")) {
    store.dispatch({
      type: "users/sendNotification",
      payload: {
        loading: false,
        message: "Contact details updated",
      },
    });
  }

  if (action.type.includes("addUser")) {
    store.dispatch({
      type: "users/sendNotification",
      payload: {
        loading: false,
        message: "New Contact created",
      },
    });
  }

  next(action);
};

export default notification;
