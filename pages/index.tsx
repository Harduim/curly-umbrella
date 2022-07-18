import type { NextPage, GetStaticProps } from 'next'
import fetchStaticProps from './fetchStaticProps'

import Layout from './layout'
import { Todo, User } from './interfaces'
import TodoCard from './TodoCard'

const UserCard: NextPage<{ user: User }> = ({ user }) => {
  return <div className="w-full card">
    <p>{user.name}</p>
    <p>{user.username}</p>
    <p>{user.email}</p>
    <p>{user.phone}</p>
    <p>{user.website}</p>
    <p className='mt-4'>Address</p>
    <div className='ml-4 mt-2'>
      <p>{user.address.street}</p>
      <p>{user.address.city}</p>
    </div>
    <p>Company</p>
    <div className='ml-4 mt-2'>
      <p>{user.company.name}</p>
      <p>{user.company.bs}</p>
    </div>
  </div>

}

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
          {userTodos.map(ut => <div>{ut.title}</div>)}
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

