import { NextPage } from "next"
import { Todo } from "./interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faToggleOn, faToggleOff, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import type { Dispatch, SetStateAction } from 'react'



const TodoCard:
  NextPage<{
    todo: Todo,
    setCompleted: Dispatch<SetStateAction<number>>
  }> = ({ todo, setCompleted }) => {
    const completedClass = todo.completed ? 'border-green-700' : 'border-red-800'
    const toggleIcon = todo.completed ? faToggleOn : faToggleOff

    return (
      <div className={`${completedClass} card border-solid border-b-4`}>
        <div className="">
          <button onClick={() => setCompleted(todo.id)}>
            <FontAwesomeIcon icon={toggleIcon} className='w-7 h-7 inline' />
            </button>
          <FontAwesomeIcon icon={faPenToSquare} className='w-6 h-6 inline ml-2 mr-2' />
          <span className="capitalize">{todo.title}</span>
        </div>
      </div>
    )

  }

export default TodoCard