import React, { Component } from "react";
import TodoItem from "./TodoItem";

export default class TodoMain extends Component {
  // inputRef = React.createRef()
  render() {
    const { list, type } = this.props;
    let showList = [];
    if (type === "active") {
      showList = list.filter((item) => !item.done);
    } else if (type === "completed") {
      showList = list.filter((item) => item.done);
    } else {
      showList = list;
    }
    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          // 使用every
          checked={list.every((item) => item.done)}
          onChange={this.handleChange}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {showList.map((item) => {
            return (
              <TodoItem
                // 把父组件给的展开给子组件
                {...this.props}
                key={item.id}
                item={item}
              ></TodoItem>
            );
          })}
        </ul>
      </section>
    );
  }

  handleChange = (e) => {
    this.props.checkedAll(e.target.checked);
  };
}
