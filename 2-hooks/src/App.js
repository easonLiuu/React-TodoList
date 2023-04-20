import TodoHeader from "./components/TodoHeader";
import TodoMain from "./components/TodoMain";
import TodoFooter from "./components/TodoFooter";

import "./styles/base.css";
import "./styles/index.css";

import React, { useState, useEffect } from "react";

export const Context = React.createContext();
const { Provider } = Context;

// const todos = [
//   { id: 1, name: "吃饭", done: false },
//   { id: 2, name: "睡觉", done: true },
//   { id: 3, name: "打豆豆", done: false },
// ];
// 只有第一次打开页面取
const App = () => {
  // 惰性初始
  const [list, setList] = useState(() => {
    console.log('111')
    return JSON.parse(localStorage.getItem('todos')) || []
  });

  // 保存到本地 属于副作用
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(list))
  }, [list])

  // 添加任务
  const addTodo = (name) => {
    setList([
      {
        id: Date.now(),
        name,
        done: false,
      },
      ...list,
    ]);
  };

  // 删除任务
  const delTodo = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  //修改任务状态
  const changeDone = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          };
        } else {
          return item;
        }
      })
    );
  };

  //修改任务名字
  const changeName = (id, name) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name
          };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <Provider value={{ delTodo, changeDone, changeName }}>
      <section className="todoapp">
        <TodoHeader addTodo={addTodo}></TodoHeader>
        <TodoMain list={list}></TodoMain>
        <TodoFooter></TodoFooter>
      </section>
    </Provider>
  );
};

export default App;
