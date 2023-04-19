import { useRef } from "react";

const TodoHeader = ({ addTodo }) => {
  const inputRef = useRef(null)
  // const [name, setName] = useState('');
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      // 子传父
      addTodo(inputRef.current.value)
      inputRef.current.value = ''
      // addTodo(name)
      // setName('')
    }
  }
  return (
    <header className="header">
      <h1>todos</h1>
      {/* 非受控 */}
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        ref={inputRef}
        // 受控
        // value={name}
        // onChange={(e) => setName(e.target.value)}
        onKeyUp={onKeyUp}
      />
    </header>
  );
};

export default TodoHeader;
