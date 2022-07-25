import type { NextPage, GetStaticProps } from 'next'

import { useContext, useEffect } from 'react'
import fetchStaticProps from '../components/fetchStaticProps'
import Layout from '../components/layout'
import { UsersTodos } from '../components/interfaces'
import GlobalContext, { IGlobalContext } from '../context/global'
import TodoCard from '../components/TodoCard'


const Home: NextPage<UsersTodos> = ({ users: initialUsers, todos: initialTodos }) => {
  const { users, todos, setUsers, setTodos } = useContext<IGlobalContext>(GlobalContext)

  useEffect(
    () => {
      if (!setTodos || !setUsers || !users || !todos) return
      if (users?.length > 0 && todos?.length > 0) return
      setTodos(initialTodos)
      setUsers(initialUsers)
    }, []
  )


  const filterTodos = (userId: number) => {
    const _todos = todos?.filter(t => t.userId === userId)
    return _todos?.sort((a, b) => Number(a.completed) - Number(b.completed))
  }

  const userBoards = users?.map(
    u => {
      const userTodos = filterTodos(u.id)
      return (
        <div style={{minWidth: '30rem'}} className='w-300 bg-gray-200 border-spacing-1 m-2 rounded' key={u.id}>
          <h1 className='capitalize m-2'>{u.name}</h1>
          {userTodos?.map(ut => <TodoCard key={`k_${ut.id}`} todo={ut} />)}
        </div>
      )
    }
  )

  return (
    <Layout>
      <div
        className=''
        style={{ height: '100vh', overflowY: 'scroll', overflowX: 'scroll' }}
      >
        <div className='flex flex-nowrap flex-row bg-white'>
          {userBoards}
        </div>
      </div>
    </Layout>
  )
}

export default Home


export const getStaticProps: GetStaticProps = fetchStaticProps

