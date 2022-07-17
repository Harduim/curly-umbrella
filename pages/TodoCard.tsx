import { NextPage } from "next"
import { Todo } from "./interfaces"


const TodoCard: NextPage<{ todo: Todo }> = ({ todo }) => {
    return <div className="card">
      <li>{todo.id}</li>
      <li>{todo.completed? 'True': 'False'}</li>
      <li>{todo.title}</li>
    </div>
  
  }

export default TodoCard