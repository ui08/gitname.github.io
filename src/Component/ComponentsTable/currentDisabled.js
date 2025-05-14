export const currentDisabled = function (data , action) {
    console.log("data , action",data.status , action);
      return action.includes(data.status)
    };