import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, toggleCreateTodoModel } from "../../Store/actionCreators/todoListActions";
import React from "react";
import { makeStyles } from "@mui/styles";
import {
  updateTitle,
  updateDescription,
  updateDueDate,
  updatePriority
} from "../../Store/actionCreators/formUIActions";
import { updateTaskId } from './../../Store/actionCreators/formUIActions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: "5px",
  },
  dialogContent: {
    display: "grid",
    gridRowGap: "10px",
    paddingTop: "10px !important",
  }
}));

const getDateInYYYYMMDD = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yyyy}-${mm}-${dd}`;
};

const CreateTodoModal = (props) => {
  const { isModalOpen } = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const { title, description, priority, dueDate, taskId } = useSelector(
    (state) => state.formUI
  );
  const classes = useStyles();

  const handleClose = () => {
    dispatch(toggleCreateTodoModel());
    resetAllFields();
  };

  const handleSubmit = (e) => {
    const todoItem = {
      title: title,
      description,
      dueDate: getDateInYYYYMMDD(dueDate),
      priority
    };
    if(taskId) {
      todoItem.taskId = taskId;
      dispatch(editTodo(todoItem));
    }else {
      props.saveTodoHandler(todoItem);
    }
    
    handleClose();
  };

  const resetAllFields = (e) => {
    dispatch(updateTaskId(undefined));
    dispatch(updateTitle(""));
    dispatch(updateDescription(""));
    dispatch(updateDueDate(null));
    dispatch(updatePriority("none"));
  };

  return (
    <Dialog onClose={handleClose} open={isModalOpen} fullWidth>
      <DialogTitle>Create new Todo</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <FormControl className={classes.formControl}>
          <TextField
            id="form-summary"
            label="Summary"
            variant="outlined"
            value={title}
            onChange={(e) => dispatch(updateTitle(e.target.value))}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="form-description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => dispatch(updateDescription(e.target.value))}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority}
            label="Priority"
            onChange={(e) => dispatch(updatePriority(e.target.value))}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month", "day"]}
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => dispatch(updateDueDate(newValue))}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodoModal;
