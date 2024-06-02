import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from "./ActionButton.module.scss";
import Button from "@mui/material/Button";
import {
  bulkCheckBox,
  bulkCheckToggle,
  completedAllDelete,
  checkedAllCompleted,
  checkedAllDelete,
  todoItemLocalStorageAdd,
} from "../../redux/todoSlice";

const ActionButton = () => {
  const dispatch = useDispatch();
  const bulkCheck = useSelector((state) => state.todo.bulkCheck);
  const todoItemLocalAdd = () => dispatch(todoItemLocalStorageAdd());

  const handleBulkCheckBox = () => {
    dispatch(bulkCheckBox());
    dispatch(bulkCheckToggle());
    todoItemLocalAdd();
  };

  const handleCheckedAllDelete = () => {
    dispatch(checkedAllDelete());
    todoItemLocalAdd();
  };

  const handleCheckedAllCompleted = () => {
    dispatch(checkedAllCompleted());
    todoItemLocalAdd();
  };

  const handleCompletedAllDelete = () => {
    dispatch(completedAllDelete());
    todoItemLocalAdd();
  };

  return (
    <div className={styles.root}>
      <div className={styles.checkBoxWrap}>
        <label>
          <p>一括</p>
          <input
            type="checkbox"
            readOnly
            checked={bulkCheck}
            onChange={handleBulkCheckBox}
          />
        </label>
      </div>
      <Button
        variant="contained"
        className={styles.checkAllDeleteButton}
        onClick={handleCheckedAllDelete}
      >
        チェックを
        <wbr />
        全て削除
      </Button>
      <Button
        variant="contained"
        className={styles.checkAllCompletedButton}
        onClick={handleCheckedAllCompleted}
      >
        チェックを
        <wbr />
        全て完了
      </Button>
      <Button
        variant="contained"
        className={styles.completedAllDeleteButton}
        onClick={handleCompletedAllDelete}
      >
        完了を
        <wbr />
        全て削除
      </Button>
    </div>
  );
};

export default ActionButton;
