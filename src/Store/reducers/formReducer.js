import {
  EDIT_DESCRIPTION,
  EDIT_DUE_DATE,
  EDIT_PRIORITY,
  EDIT_SUMMARY,
  EDIT_TASK_ID,
} from "../../actionTypes";

const INITIAL_STATE = {
  title: "",
  description: "",
  dueDate: null,
  priority: "none",
  taskId: undefined,
};

export default function (state = INITIAL_STATE, action = {}) {
  const updatedState = { ...state };
  switch (action.type) {
    case EDIT_SUMMARY:
      updatedState.title = action.values.title;
      break;
    case EDIT_DESCRIPTION:
      updatedState.description = action.values.description;
      break;
    case EDIT_PRIORITY:
      updatedState.priority = action.values.priority;
      break;
    case EDIT_DUE_DATE:
      updatedState.dueDate = action.values.dueDate;
      break;
    case EDIT_TASK_ID:
      updatedState.taskId = action.values.taskId;
      break;
    default:
      break;
  }
  return updatedState;
}
