import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import { Delete, Edit } from "@mui/icons-material";
import {
  deleteTodoTask,
  toggleCreateTodoModel,
} from "../../Store/actionCreators/todoListActions";
import { updateTaskStatus } from "./../../Store/actionCreators/todoListActions";
import {
  updateTitle,
  updateDescription,
  updateDueDate,
  updatePriority,
  updateTaskId
} from "../../Store/actionCreators/formUIActions";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
  },
  accordionContent: {
    justifyContent: "space-between",
  },
}));

const TodoListTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { todos, filter = "all" } = props;
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEdit = (task) => {
    // open modal
    dispatch(updateTaskId(task.id));
    dispatch(updateTitle(task.title));
    dispatch(updateDescription(task.description));
    dispatch(updateDueDate(new Date(task.dueDate)));
    dispatch(updatePriority(task.priority));
    dispatch(toggleCreateTodoModel());
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTodoTask(taskId));
  };

  const handleCheckBoxClick = (task) => {
    if (task.currentState === "open") {
      dispatch(updateTaskStatus(task.id, "done"));
    } else if (task.currentState === "done") {
      dispatch(updateTaskStatus(task.id, "open"));
    }
  };

  let updatedTodos = todos;
  if (!updatedTodos) return null;
  if (filter === "completed") {
    updatedTodos = todos.filter((item) => item.currentState === "done");
  } else if (filter === "pending") {
    updatedTodos = todos.filter((item) => item.currentState === "open");
  }

  if (updatedTodos && updatedTodos.length === 0) {
    return <div>No tasks</div>;
  }

  return (
    <div>
      {updatedTodos.map((item) => {
        const key = filter + "--" + item.title + "-" + item.id;
        const checked = item.currentState === "done" ? true : false;
        return (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={handleChange(key)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              classes={{
                content: classes.accordionContent,
              }}
            >
              <div className={classes.title}>
                <Checkbox
                  checked={checked}
                  onClick={() => handleCheckBoxClick(item)}
                />
                <Typography sx={{ flexShrink: 0, margin: "auto 0" }}>
                  {item.title}
                </Typography>
              </div>

              <div>
                <Tooltip title="Edit">
                  <IconButton onClick={(e) => handleEdit(item)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton onClick={(e) => handleDelete(item.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.description}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default TodoListTable