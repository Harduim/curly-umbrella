import type { NextPage, GetStaticProps } from 'next'

import Layout from './layout'
import { Todo, User } from './interfaces'

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

const TodoCard: NextPage<{ todo: Todo }> = ({ todo }) => {
  return <div className="w-full card">
    <li>{todo.id}</li>
    <li>{todo.completed}</li>
    <li>{todo.title}</li>
  </div>

}

const Home: NextPage<{ users: User[], todos: Todo[] }> = ({ users, todos }) => {
  return (
    <Layout>

      <div className="grid gap-4 grid-cols-2">
        {users.map(u => <UserCard key={u.id} user={u} />)}
      </div>
      <div className="grid gap-4 grid-cols-3">
        {todos.map(t => <TodoCard key={t.id} todo={t} />)}
      </div>

    </Layout>
  )
}

export default Home


export const getStaticProps: GetStaticProps = async () => {
  const todos: Todo[] = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json()
  const users: User[] = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()


  return {
    props: {
      users,
      todos
    }
  }
}
