import React, { FC, useEffect } from "react";
import TodoList from "./TodoList";
import store from "./store";

const Demo: FC = () => {
  return (
    <>
      <p>TodoList by mobx</p>
      <TodoList store={store} />
    </>
  );
};

export default Demo;
