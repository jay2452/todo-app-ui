import {
  DELETE_TODO,
  EDIT_TODO,
  GET_TODO_LIST,
  SAVE_TODO,
  TOGGLE_CREATE_TODO_MODAL,
  UPDATE_TASK_STATE,
} from "../../actionTypes";

const INITIAL_STATE = {
  todos: null,
  isModalOpen: false,
};

export default function (state = INITIAL_STATE, action = {}) {
  const updatedState = { ...state };

  switch (action.type) {
    case GET_TODO_LIST:
      updatedState.todos = action.values.todos;
      break;

    case TOGGLE_CREATE_TODO_MODAL:
      updatedState.isModalOpen = !updatedState.isModalOpen;
      break;

    case SAVE_TODO:
      {
        const { title, description, priority, dueDate } = action.values;
        const length = updatedState.todos.length;
        updatedState.todos = [
          ...updatedState.todos,
          {
            id: length + 1,
            title,
            description,
            priority,
            dueDate,
            currentState: "open",
          },
        ];
      }
      break;
    case DELETE_TODO:
      {
        const id = action.values.id;
        let idx = -1;
        for (let i = 0; i < updatedState.todos.length; i++) {
          if (updatedState.todos[i].id === id) {
            idx = i;
            break;
          }
        }
        if (id > -1) {
          updatedState.todos.splice(idx, 1);
        }
      }
      break;

    case UPDATE_TASK_STATE:
      {
        const { state, id } = action.values;
        const task = updatedState.todos.find((item) => item.id === id);
        if (task) {
          task.currentState = state;
        }
      }
      break;

    case EDIT_TODO: {
      const {taskId, title, description, priority, dueDate} = action.values.taskItem;
      const task = updatedState.todos.find(item => item.id === taskId);
      if(task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
      }
    }
    break;

    default:
      break;
  }
  return updatedState;
}
