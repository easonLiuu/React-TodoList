import type { TodoType } from "./store";

export type ActionType = {
  type: string;
  payload?: any;
};

export default function reducer(state: TodoType[], action: ActionType) {
  switch (action.type) {
    case "add":
      return state.concat(action.payload); // 返回新的state
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      throw new Error();
  }
}
