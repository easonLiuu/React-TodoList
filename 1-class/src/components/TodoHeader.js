import React, { Component } from "react";

export default class TodoHeader extends Component {
  state = {
    name: "",
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        {/* 受控组件 */}
        {/* 通过受控组件拿到name的值 */}
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          onKeyUp={this.addTodo}
        />
      </header>
    );
  }
  addTodo = (e) => {
    // 必须是回车键
    if (e.keyCode !== 13) return;
    if (!this.state.name.trim()) {
      return alert("名称不能为空");
    }
    // 添加todo
    this.props.addTodo(this.state.name);
    this.setState({ name: "" });
  };
}
