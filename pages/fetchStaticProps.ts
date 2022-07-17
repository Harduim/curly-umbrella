import type { GetStaticProps } from 'next'
import { User, Todo } from './interfaces'

const fetchStaticProps: GetStaticProps = async () => {
  const todos: Todo[] = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json()
  const users: User[] = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()

  return { props: { users, todos } }
}

export default fetchStaticProps


export const getStaticProps: GetStaticProps = fetchStaticProps
