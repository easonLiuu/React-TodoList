import { Context } from "../App";
import { useContext } from "react";

const TodoItem = ({ item }) => {
  const { delTodo, changeDone } = useContext(Context);
  return (
    <li key={item.id} className={item.done ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={item.done}
          onChange={() => changeDone(item.id)}
        />
        <label>{item.name}</label>
        <button className="destroy" onClick={() => delTodo(item.id)}></button>
      </div>
      <input className="edit" value="Create a TodoMVC template" />
    </li>
  );
};

export default TodoItem;
