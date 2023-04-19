import React, { Component } from "react";
import classnames from "classnames";
// 一个组件维护一个状态ref 所以要抽取出来一个组件
export default class TodoItem extends Component {
  state = {
    // 用来存当前双击的id 用来添加editing这个类
    currentId: "",
    // 当前双击的名字
    currentName: "",
  };
  inputRef = React.createRef()
  render() {
    const { item } = this.props;
    return (
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
          <label onDoubleClick={() => this.showEdit(item)}>{item.name}</label>
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
          onChange={(e) => this.setState({ currentName: e.target.value })}
          onKeyUp={this.handleKeyUp}
          onBlur={() => this.setState({currentId: ''})}
          // 这么写不行 拿到的是最后的一个input的ref ref={this.inputRef}
          // 所以要把每一个li单独封装成一个组件
          ref={this.inputRef}
        />
      </li>
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
    // 这里不能这么写 this.inputRef.current.focus() 组件更新是异步的
    // console.log(this.inputRef.current)
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
  componentDidUpdate () {
    this.inputRef.current.focus()
  }
}
// 1.main里的li抽取成一个组件
// 2.ref input
// 3.组件更新完成获取焦点
