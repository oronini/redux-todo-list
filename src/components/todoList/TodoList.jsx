import styles from "./TodoList.module.scss";
import TodoItem from "../todoItem/TodoItem";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todoItem = useSelector((state) => state.todo.todoItem);

  return (
    <div className={styles.root}>
      {todoItem.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
