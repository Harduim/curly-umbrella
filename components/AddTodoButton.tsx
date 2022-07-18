import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Todo } from './interfaces'
import GlobalContext from '../context/global'


const AddTodoButton: NextPage = () => {
    const { handleAddTodo } = useContext(GlobalContext)
    const [todo, setTodo] = useState<Todo>()

    if (!handleAddTodo) return null

    return (
        <button
            title="Add Todo"
            onClick={() => handleAddTodo(todo)}
            className="fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-green-900 text-white text-3xl font-bold"
        >
            <FontAwesomeIcon icon={faPlus} className="w-8 mx-auto" />
        </button>
    )
}


