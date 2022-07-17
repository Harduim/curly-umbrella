import type { NextPage, GetStaticProps } from 'next'
import fetchStaticProps from '../fetchStaticProps'
import { User, Todo } from '../interfaces'
import Layout from '../layout'
import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import TodoCard from '../TodoCard'

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
    const filterTodos = (userId: number) => todos.filter(t => t.userId === userId)
    const [activeUser, setActiveUser] = useState(users[0].id)
    const [userTodos, setUserTodos] = useState(filterTodos(activeUser))

    useEffect(() => setUserTodos(filterTodos(activeUser)), [activeUser])

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
                        {userTodos.map(t => <TodoCard key={t.id} todo={t} />)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserPage

export const getStaticProps: GetStaticProps = fetchStaticProps
