import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles/base.css";
import "./styles/index.css";

import TodoHeader from "./components/TodoHeader";
import TodoMain from "./components/TodoMain";
import TodoFooter from "./components/TodoFooter";

class App extends Component {
  state = {
    list: [
      { id: 1, name: "吃饭", done: false },
      { id: 2, name: "睡觉", done: true },
      { id: 3, name: "打豆豆", done: false },
    ],
    // 有三个值 all active completed
    type: "active",
  };
  render() {
    const { list, type } = this.state;
    return (
      <section className="todoapp">
        <TodoHeader addTodo={this.addTodo}></TodoHeader>
        <TodoMain
          list={list}
          type={type}
          delTodoById={this.delTodoById}
          updateDoneById={this.updateDoneById}
          editTodo={this.editTodo}
          checkedAll={this.checkedAll}
        ></TodoMain>
        <TodoFooter
          list={list}
          type={type}
          clearTodo={this.clearTodo}
          changeType={this.changeType}
        ></TodoFooter>
      </section>
    );
  }
  delTodoById = (id) => {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    });
  };
  updateDoneById = (id) => {
    // 根据id把对应任务状态取反
    // const todo = this.state.list.find((item) => item.id === id);
    // vue中直接 todo.done = !todo.done
    // map获取新数组
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          // 不能这么写 改变的还是原来的
          // item.done = !item.done
          // 这里好好理解react中的数据不可变 一定要返回新数据！
          return {
            ...item,
            done: !item.done,
          };
        } else {
          return item;
        }
      }),
    });
  };
  addTodo = (name) => {
    this.setState({
      list: [
        {
          id: Date.now(),
          name,
          done: false,
        },
        ...this.state.list,
      ],
    });
  };
  editTodo = (id, name) => {
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name,
          };
        } else {
          return item;
        }
      }),
    });
  };
  clearTodo = () => {
    this.setState({
      list: this.state.list.filter((item) => !item.done),
    });
  };
  changeType = (type) => {
    this.setState({
      type,
    });
  };
  checkedAll = (check) => {
    this.setState({
      list: this.state.list.map(item => {
        return {
          ...item,
          done: check
        }
      })
    })
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
