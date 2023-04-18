import React, { Component } from "react";
import classnames from "classnames";

export default class TodoMain extends Component {
  state = {
    // 用来存当前双击的id 用来添加editing这个类
    currentId: "",
    // 当前双击的名字
    currentName: "",
  };
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
              // 动态渲染
              <li
                className={classnames({
                  completed: item.done,
                  editing: item.id === this.state.currentId,
                })}
                key={item.id}
              >
                <div className="view">
                  {/* 受控组件 */}
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={item.done}
                    onChange={() => this.updateDone(item.id)}
                  />
                  {/* 双击label */}
                  <label onDoubleClick={() => this.showEdit(item)}>
                    {item.name}
                  </label>
                  <button
                    className="destroy"
                    onClick={() => this.delTodo(item.id)}
                  ></button>
                </div>
                {/* 这里为什么不直接value={item.name} 还是由于react的数据不可变 如果最后没有敲回车
                敲了esc 但此时item.name已经变了 就很麻烦 所以存起来 如果数据需要变 把这个存的数据
                传给父组件即可 */}
                {/* 受控组件 */}
                <input
                  className="edit"
                  value={this.state.currentName}
                  onChange={(e) =>
                    this.setState({ currentName: e.target.value })
                  }
                  onKeyUp={this.handleKeyUp}
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
  // 子传父 删除任务
  delTodo = (id) => {
    this.props.delTodoById(id);
  };
  // 修改任务状态
  updateDone = (id) => {
    this.props.updateDoneById(id);
  };
  showEdit = ({ id, name }) => {
    // 双击时把当前需要editing的id存起来
    this.setState({
      currentId: id,
      currentName: name,
    });
  };
  handleKeyUp = (e) => {
    if (e.keyCode === 27) {
      // esc取消修改
      this.setState({
        currentId: "",
        currentName: "",
      });
    }
    if (e.keyCode === 13) {
      // 添加
      this.props.editTodo(this.state.currentId, this.state.currentName);
      // 关闭
      this.setState({
        currentId: "",
        currentName: "",
      });
    }
  };
  handleChange = (e) => {
    this.props.checkedAll(e.target.checked)
  }
}
