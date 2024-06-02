import styles from "./InputForm.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  handleModalOpen,
  editTodoText,
  checkTodoItemChecked,
  todoIdLocalStorageAdd,
  todoItemLocalStorageAdd,
} from "../../redux/todoSlice";

const InputForm = ({ edit }) => {
  const dispatch = useDispatch();
  const editTodo = useSelector((state) => state.todo.selectTodo);
  const { register, handleSubmit, reset } = useForm();
  const todoItemLocalAdd = () => dispatch(todoItemLocalStorageAdd());

  const createSubmit = (data) => {
    if (data.todoText !== "") {
      dispatch(createTodo(data.todoText));
      dispatch(checkTodoItemChecked());
      dispatch(todoIdLocalStorageAdd());
      todoItemLocalAdd();
    }
    reset();
  };

  const editSubmit = (data) => {
    if (data.todoText !== "") {
      dispatch(editTodoText(data.todoText));
      dispatch(handleModalOpen(false));
      todoItemLocalAdd();
    } else {
      alert("テキストを空欄では登録できません。");
    }
  };

  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(editSubmit) : handleSubmit(createSubmit)}
        className={styles.form}
      >
        <TextField
          id="filled-basic"
          label={edit ? "Edit ToDo" : "New ToDo"}
          variant="filled"
          {...register("todoText")}
          defaultValue={edit ? editTodo.todoText : ""}
          className={edit ? styles.modal_text_field : styles.text_field}
        />
        {edit ? (
          <div className={styles.buttonArea}>
            <Button
              type="submit"
              variant="contained"
              className={styles.submitButton}
            >
              Submit
            </Button>
            <Button
              onClick={() => dispatch(handleModalOpen(false))}
              variant="outlined"
              className={styles.cancelButton}
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default InputForm;
