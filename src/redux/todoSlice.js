import { createSlice } from "@reduxjs/toolkit";

const localStorageDataTodoId = JSON.parse(localStorage.getItem("todoId"));
const localStorageDataTodoItem = JSON.parse(localStorage.getItem("todoItem"));

const initialState = {
  todoId: localStorageDataTodoId ? localStorageDataTodoId + 1 : 0,
  todoItem: localStorageDataTodoItem ? localStorageDataTodoItem : [],
  isModalState: false,
  selectTodo: {},
  bulkCheck: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // todoの作成
    createTodo: (state, action) => {
      state.todoId++;
      const addTodo = {
        id: state.todoId,
        todoText: action.payload,
        completed: false,
        checked: false,
      };
      state.todoItem = [...state.todoItem, addTodo];
    },
    // todoの完了・未完了の変更
    completedTodo: (state, action) => {
      const todo = state.todoItem.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // todoの削除
    deleteTodo: (state, action) => {
      state.todoItem = state.todoItem.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
    // 編集todoの選択
    editSelectTodo: (state, action) => {
      state.selectTodo = action.payload;
    },
    // 編集todoの反映
    editTodoText: (state, action) => {
      const newTodo = state.todoItem.map((todo) => {
        if (todo.id === state.selectTodo.id) {
          return {
            ...todo,
            todoText: action.payload,
          };
        }
        return todo;
      });
      state.todoItem = newTodo;
    },
    // モーダルの開閉
    handleModalOpen: (state, action) => {
      state.isModalState = action.payload;
    },
    // checkboxのトグル
    handleCheckBox: (state, action) => {
      const todo = state.todoItem.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.checked = !todo.checked;
      }
    },
    // 一括checkboxのトグル
    bulkCheckBox: (state) => {
      state.bulkCheck = !state.bulkCheck;
    },
    // 一括checkboxに応じてtodoItemのcheckboxを変更
    bulkCheckToggle: (state) => {
      const newTodoItem = state.todoItem.map((todo) => {
        return { ...todo, checked: state.bulkCheck };
      });
      state.todoItem = newTodoItem;
    },
    // todoItemのcheckboxに応じて一括checkboxの判定
    checkTodoItemChecked: (state) => {
      const check = state.todoItem.filter(
        (todo) => todo.checked === !state.bulkCheck
      );
      if (
        state.todoItem.length == 0 ||
        check.length !== state.todoItem.length
      ) {
        state.bulkCheck = false;
      } else if (state.todoItem.length === 1) {
        state.bulkCheck = state.todoItem[0].checked;
      } else {
        state.bulkCheck = true;
      }
    },
    // チェックを全て削除
    checkedAllDelete: (state) => {
      const newTodo = state.todoItem.filter((todo) => !todo.checked);
      state.todoItem = newTodo;
      state.bulkCheck = false;
    },

    // チェックを全て完了
    checkedAllCompleted: (state) => {
      const newTodoItem = state.todoItem.map((todo) => {
        if (todo.checked) {
          return {
            ...todo,
            completed: true,
            checked: false,
          };
        }
        return todo;
      });
      state.todoItem = newTodoItem;
      state.bulkCheck = false;
    },
    // 完了を全て削除
    completedAllDelete: (state) => {
      const newTodoItem = state.todoItem.filter((todo) => !todo.completed);
      state.todoItem = newTodoItem;
    },
    // ローカルストレージにtodoItemを保存
    todoItemLocalStorageAdd: (state) => {
      localStorage.setItem("todoItem", JSON.stringify(state.todoItem));
    },
    // ローカルストレージにtodoIdを保存
    todoIdLocalStorageAdd: (state) => {
      localStorage.setItem("todoId", state.todoId);
    },
  },
});

export const {
  createTodo,
  completedTodo,
  deleteTodo,
  handleModalOpen,
  editSelectTodo,
  editTodoText,
  handleCheckBox,
  bulkCheckBox,
  bulkCheckToggle,
  checkTodoItemChecked,
  checkedAllDelete,
  checkedAllCompleted,
  completedAllDelete,
  todoItemLocalStorageAdd,
  todoIdLocalStorageAdd,
} = todoSlice.actions;
export default todoSlice.reducer;
