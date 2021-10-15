import TaskButton from "./Components/TaskButton/index";
import TodoListTable from "./Containers/TodoListTable/index";
import {
  getTodoListAPI,
  saveTodo,
  toggleCreateTodoModel,
} from "./Store/actionCreators/todoListActions";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTodoModal from "./Containers/CreateTodoModal";
import { makeStyles } from "@mui/styles";
import TabPanel from './Components/TabPanel';
import {
  CircularProgress,
  Tab,
  Tabs,
  TextField
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 600,
    margin: "auto",
    marginTop: 20,
  },
}));



function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const [todosLocal, setTodosLocal] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);
  const [searchFieldValue, setSearchFieldValue] = React.useState("");
  const [todoCount, setTodoCount] = React.useState(-1);

  React.useEffect(() => {
    dispatch(getTodoListAPI());
  }, [dispatch]);

  const toggleModal = () => {
    dispatch(toggleCreateTodoModel());
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const searchTasks = (value) => {
    let filteredResults = null;
    if (todos && todos.length > 0 && value) {
      filteredResults = todos.filter((item) => {
        return item.title.toLowerCase().startsWith(value.toLowerCase());
      });
      setTodosLocal(filteredResults);
    } else if (value === "") {
      setTodosLocal(todos);
    }
  };

  React.useEffect(() => {
    setTodosLocal(todos);
  }, [todos && todos.length, todoCount]);

  React.useEffect(() => {
    searchTasks(searchFieldValue);
  }, [searchFieldValue]);

  const saveTodoHandler = (todoItem) => {
    const updatedCount = todoCount + 1;
    setTodoCount(updatedCount);
    dispatch(saveTodo(todoItem));
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search tasks"
          variant="outlined"
          value={searchFieldValue}
          onChange={(e) => setSearchFieldValue(e.target.value)}
        />
        {todos === null ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <Fragment>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="All Tasks" />
              <Tab label="Completed" />
              <Tab label="Pending" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <TodoListTable filter="all" todos={todosLocal} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TodoListTable filter="completed" todos={todosLocal} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <TodoListTable filter="pending" todos={todosLocal} />
            </TabPanel>
          </Fragment>
        )}

        <TaskButton toggleModal={toggleModal} />
      </div>
      <CreateTodoModal saveTodoHandler={saveTodoHandler} />
    </Fragment>
  );
}

export default App;
