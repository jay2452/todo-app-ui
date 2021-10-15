import {
  DELETE_TODO,
  GET_TODO_LIST,
  SAVE_TODO,
  TOGGLE_CREATE_TODO_MODAL,
  UPDATE_TASK_STATE,
  EDIT_TODO
} from "../../actionTypes";

import todolistData from "../staticData/todoListData";

const saveTodoListInReducer = (data) => {
  return {
    type: GET_TODO_LIST,
    values: {
      todos: data,
    },
  };
};

export const getTodoListAPI = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(saveTodoListInReducer(todolistData));
    }, 1000);
  };
};

export const toggleCreateTodoModel = () => {
  return {
    type: TOGGLE_CREATE_TODO_MODAL,
  };
};

export const saveTodo = (todoItem) => {
  const { title, description, priority, dueDate } = todoItem;
  return {
    type: SAVE_TODO,
    values: {
      title,
      description,
      priority,
      dueDate,
    },
  };
};

export const deleteTodoTask = (id) => {
  return {
    type: DELETE_TODO,
    values: {
      id,
    },
  };
};

export const updateTaskStatus = (id, state) => {
  return {
    type: UPDATE_TASK_STATE,
    values: {
      id,
      state,
    },
  };
};


export const editTodo = (taskItem) => {
  return {
    type: EDIT_TODO,
    values: {
      taskItem
    }
  }
}