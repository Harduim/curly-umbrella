import type { NextPage, GetStaticProps } from 'next'
import fetchStaticProps from '../components/fetchStaticProps'

import Layout from '../components/layout'
import { Todo, User } from '../components/interfaces'


const Home: NextPage<{ users: User[], todos: Todo[] }> = ({ users, todos }) => {
  const filterTodos = (userId: number) => {
    const _todos = todos.filter(t => t.userId === userId)
    return _todos.sort((a, b) => Number(a.completed) - Number(b.completed))
  }

  const userBoards = users.map(
    u => {
      const userTodos = filterTodos(u.id)
      return (
        <div className='' key={u.id}>
          {u.name}
          {userTodos.map(ut => <div key={ut.id}>{ut.title}</div>)}
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

