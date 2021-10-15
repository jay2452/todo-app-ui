import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const TaskButton = (props) => {

    const fabButtonClickHandler = (e) => {
        props.toggleModal();
    }


  return (
    <Fab sx={fabStyle} color="primary" aria-label="add" onClick={fabButtonClickHandler}>
      <AddIcon />
    </Fab>
  );
};

export default TaskButton;
