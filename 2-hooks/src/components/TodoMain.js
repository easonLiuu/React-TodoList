import TodoItem from "./TodoItem";

const TodoList = ({ list }) => {
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {list.map((item) => {
          return <TodoItem key={item.id} item={item}></TodoItem>;
        })}
      </ul>
    </section>
  );
};

export default TodoList;
