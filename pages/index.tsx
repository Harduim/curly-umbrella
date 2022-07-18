import type { NextPage, GetStaticProps } from 'next'
import fetchStaticProps from '../components/fetchStaticProps'
import { useContext, useEffect } from 'react'
import Layout from '../components/layout'
import { UsersTodos } from '../components/interfaces'
import GlobalContext, { IGlobalContext } from '../context/global'


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
        <div className='' key={u.id}>
          {u.name}
          {userTodos?.map(ut => <div key={ut.id}>{ut.title}</div>)}
        </div>
      )
    }
  )

  return (
    <Layout>

      <div className='card'>
        {userBoards}
      </div>

    </Layout>
  )
}

export default Home


export const getStaticProps: GetStaticProps = fetchStaticProps

