const taskAction = (state, action) => {
  switch(action.type) {
    case "init":
      return action.payload;
    case "delete":
      return action.payload;
    case "add":
      const add_result = state.concat(action.payload);
      console.log("add_result: ", add_result);
      return add_result;
  }
};

export {
  taskAction
}
