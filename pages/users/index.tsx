import type { NextPage, GetStaticProps } from 'next'
import fetchStaticProps from '../fetchStaticProps'
import { User, Todo } from '../interfaces'
import Layout from '../layout'
import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import TodoCard from '../TodoCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const UserNavItem:
    NextPage<{
        user: User,
        activeUser: number,
        setActive: Dispatch<SetStateAction<number>>
    }> = ({ user, activeUser, setActive }) => {
        const isActive = activeUser === user.id

        return (
            <button
                className={`max-auto p-1 ${isActive ? 'bg-gray-900' : ''} hover:bg-gray-700 w-full`}
                onClick={() => setActive(user.id)}
            >
                {user.name}
            </button>
        )
    }




const UserPage: NextPage<{ users: User[], todos: Todo[] }> = ({ users, todos }) => {
    const filterTodos = (userId: number) => {
        const _todos = todos.filter(t => t.userId === userId)
        return _todos.sort((a, b) => Number(a.completed) - Number(b.completed))
    }
    const [activeUser, setActiveUser] = useState(users[0].id)
    const [userTodos, setUserTodos] = useState(filterTodos(activeUser))

    useEffect(() => setUserTodos(filterTodos(activeUser)), [activeUser])

    const setCompleted = (id: number) => {
        const todo = userTodos.find(t => t.id === id)
        if (!todo) return
        const _todos = userTodos.filter(t => t.id !== id)
        todo.completed = !todo.completed
        const newTodos = [todo, ..._todos].sort((a, b) => Number(a.completed) - Number(b.completed))
        setUserTodos(newTodos)
    }


    return (
        <Layout>
            <div className='grid-container'>
                <div className='flex flex-col bg-gray-800 text-white col-span-2'>
                    <div className='m-2'>Usuários</div>
                    {users.map(u => (
                        <UserNavItem
                            key={u.id}
                            user={u}
                            setActive={setActiveUser}
                            activeUser={activeUser}
                        />
                    ))}
                </div>
                <div className='col-span-10 bg-gray-200'>
                    <div style={{ height: '100vh', overflowY: 'scroll' }}>
                        {userTodos.map(t => <TodoCard key={t.id} todo={t} setCompleted={setCompleted} />)}
                    </div>
                </div>
            </div>


            <button
              title="Go To Top"
              className="fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-green-900 text-white text-3xl font-bold"
             >
                <FontAwesomeIcon icon={faPlus} className="w-8 mx-auto"/>
            </button>


        </Layout>
    )
}

export default UserPage

export const getStaticProps: GetStaticProps = fetchStaticProps
