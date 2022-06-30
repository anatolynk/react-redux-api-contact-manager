const logger = (store) => (next) => (action) => {
  console.log("Middleware - Actions: ", action.type);
  // console.log("Middleware  - Payload: ", action.payload);
  next(action);
};

export default logger;
