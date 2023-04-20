import { Context } from "../App";
import { useState, useRef, useContext, useEffect } from "react";

const TodoItem = ({ item }) => {
  const { delTodo, changeDone, changeName } = useContext(Context);
  // 存起来
  const [current, setCurrent] = useState({
    id: "",
    name: "",
  });
  // 创建ref
  const inputRef = useRef(null);
  // 当current发生改变 input框获取焦点 属于副作用
  useEffect(() => {
    inputRef.current.focus();
  }, [current]);

  const showEdit = (item) => {
    setCurrent({
      id: item.id,
      name: item.name,
    });
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 27) {
      setCurrent({id: '', name: ''})
    }
    if (e.keyCode === 13) {
      // 修改
      changeName(current.id, current.name)
      setCurrent({id: '', name: ''})
    }
  }
  return (
    <li
      key={item.id}
      className={[
        item.done ? "completed" : "",
        item.id === current.id ? "editing" : "",
      ].join(" ")}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={item.done}
          onChange={() => changeDone(item.id)}
        />
        <label onDoubleClick={() => showEdit(item)}>{item.name}</label>
        <button className="destroy" onClick={() => delTodo(item.id)}></button>
      </div>
      <input
        className="edit"
        value={current.name}
        // 不想让他受控 但还想让他有默认值
        // defaultValue={current.name}
        ref={inputRef}
        // onBlur={() => setCurrent(null)}
        // 不能这么写 因为需要访问其id
        // 如果直接给{} 也就是undefined 会报错
        onBlur={() => setCurrent({id: '', name: ''})}
        onChange={(e) =>
          setCurrent({
            ...current,
            name: e.target.value,
          })
        }
        onKeyUp={onKeyUp}
      />
    </li>
  );
};

export default TodoItem;
