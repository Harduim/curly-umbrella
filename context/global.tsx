import { Dispatch, SetStateAction, createContext, FC, ReactNode, useState } from 'react'
import { User, Todo } from '../components/interfaces'


interface Props { children: ReactNode }

export interface IGlobalContext {
    users?: User[],
    todos?: Todo[],
    setUsers?: Dispatch<SetStateAction<User[]>>
    setTodos?: Dispatch<SetStateAction<Todo[]>>
    handleCompleteTodo?: Function
    handleDeleteTodo?: Function
    handleAddTodo?: Function
}

const GlobalContext = createContext<IGlobalContext>({})

export const GlobalProvider: FC<Props> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([])
    const [todos, setTodos] = useState<Todo[]>([])

    const handleCompleteTodo = (id: number) => {
        const todo = todos.find(t => t.id === id)
        if (!todo) return
        const _todos = todos.filter(t => t.id !== id)
        todo.completed = !todo.completed
        const newTodos = [todo, ..._todos].sort((a, b) => Number(a.completed) - Number(b.completed))
        setTodos(newTodos)
    }

    const handleDeleteTodo = (id: number) => setTodos(todos.filter(t => t.id !== id))

    const handleAddTodo = (todo: Todo) => setTodos([todo, ...todos].sort((a, b) => Number(a.completed) - Number(b.completed)))



    return (
        <GlobalContext.Provider value={{ users, todos, setUsers, setTodos, handleCompleteTodo, handleDeleteTodo, handleAddTodo }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext