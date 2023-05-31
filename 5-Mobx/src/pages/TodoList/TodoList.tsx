import React, { FC } from "react";
import { observer } from "mobx-react";
import { ObservableTodoListStore } from "./store";
import TodoView from "./TodoView";

type PropsType = {
  store: ObservableTodoListStore;
};

const TodoList: FC<PropsType> = observer((props: PropsType) => {
  const { store } = props;
  function newTodo() {
    const taskName = prompt("输入事项");
    if (taskName) {
      store.addTodo(taskName);
    }
  }

  function del(id: string) {
    store.removeTodo(id);
  }
  return (
    <>
      <button onClick={newTodo}>add todo</button>
      <ul>
        {store.todos.map((todo) => {
          const { id } = todo;
          return <TodoView key={id} todo={todo} del={del} />;
        })}
      </ul>
      <p>completed: {store.completedTodosCount}</p>
    </>
  );
});

export default TodoList;
