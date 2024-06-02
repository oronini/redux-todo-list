import styles from "./App.module.scss";
import ActionButton from "./components/actionButton/ActionButton";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import TodoList from "./components/todoList/TodoList";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <InputForm />
        <ActionButton />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
