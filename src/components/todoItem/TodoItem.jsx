import styles from "./TodoItem.module.scss";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Modal from "@mui/material/Modal";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDispatch, useSelector } from "react-redux";
import {
  completedTodo,
  deleteTodo,
  handleModalOpen,
  editSelectTodo,
  handleCheckBox,
  checkTodoItemChecked,
  todoItemLocalStorageAdd,
} from "../../redux/todoSlice";
import InputForm from "../inputForm/InputForm";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const isModalState = useSelector((state) => state.todo.isModalState);
  const todoItemLocalAdd = () => dispatch(todoItemLocalStorageAdd());

  const handleEdit = () => {
    dispatch(handleModalOpen(true));
    dispatch(editSelectTodo(todo));
  };

  const changeCheckBox = () => {
    dispatch(handleCheckBox(todo));
    dispatch(checkTodoItemChecked());
    todoItemLocalAdd();
  };

  const handleCompleted = () => {
    dispatch(completedTodo(todo));
    todoItemLocalAdd();
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo));
    todoItemLocalAdd();
  };

  return (
    <div className={`${styles.root} ${todo.completed ? "completed" : ""}`}>
      <div className={styles.todo}>
        <label>
          <input
            type="checkbox"
            readOnly
            checked={todo.checked}
            onChange={changeCheckBox}
          />
          <AssignmentIcon className={styles.assignment_icon} />
          <div className={styles.todo_text}>{todo.todoText}</div>
        </label>
      </div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        className={styles.button_group}
      >
        <Button className={styles.check_button} onClick={handleCompleted}>
          <CheckIcon />
        </Button>
        <Button className={styles.edit_button} onClick={handleEdit}>
          <ModeEditIcon />
        </Button>
        <Button className={styles.delete_button} onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </ButtonGroup>
      <Modal
        open={isModalState}
        onClose={() => dispatch(handleModalOpen(false))}
        className={styles.modal}
      >
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit Window</div>
          <InputForm edit />
        </div>
      </Modal>
    </div>
  );
};

export default TodoItem;
