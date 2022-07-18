import type { NextPage, GetStaticProps } from 'next'
import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import fetchStaticProps from '../../components/fetchStaticProps'
import { User, UsersTodos } from '../../components/interfaces'
import Layout from '../../components/layout'
import TodoCard from '../../components/TodoCard'
import GlobalContext, { IGlobalContext } from '../../context/global'

const UserNavItem:
    NextPage<{
        user: User,
        activeUser: number,
        setActive: Dispatch<SetStateAction<number>>
    }> = ({ user, activeUser, setActive }) => {
        const isActive = activeUser === user.id

        return (
            <div className='max-auto p-1'>
                <div className={`${isActive ? 'border-r-2' : ''} hover:bg-gray-700`}>
                    <button
                        onClick={() => setActive(user.id)}
                    >
                        {user.name}
                    </button>
                </div>
            </div>
        )
    }


const UserPage: NextPage<UsersTodos> = ({ users: initialUsers, todos: initialTodos }) => {

    const { users: globalUsers, todos: globalTodos, setUsers, setTodos } = useContext<IGlobalContext>(GlobalContext)
    const users = globalUsers || initialUsers
    const todos = globalTodos || initialTodos

    useEffect(
        () => {
          if (!setTodos || !setUsers || !users || !todos) return
          if (users?.length > 0 && todos?.length > 0) return
          setTodos(initialTodos)
          setUsers(initialUsers)
        }, []
      )

    const filterTodos = (userId: number) => {
        const _todos = todos.filter(t => t.userId === userId)
        return _todos.sort((a, b) => Number(a.completed) - Number(b.completed))
    }
    const firstUser = users[0]
    const [activeUser, setActiveUser] = useState(firstUser?.id || 1)
    const [userTodos, setUserTodos] = useState(filterTodos(activeUser))

    useEffect(() => {
        let _todos = todos.filter(t => t.userId === activeUser)
        _todos = _todos.sort((a, b) => Number(a.completed) - Number(b.completed))
        setUserTodos(_todos)
    },
        [activeUser, todos]
    )

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
                        {userTodos.map(t => { return <TodoCard key={t.id} todo={t} /> })}
                    </div>
                </div>
            </div>


            <button
                title="Go To Top"
                className="fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-green-900 text-white text-3xl font-bold"
            >
                <FontAwesomeIcon icon={faPlus} className="w-8 mx-auto" />
            </button>


        </Layout>
    )
}

export default UserPage

export const getStaticProps: GetStaticProps = fetchStaticProps
