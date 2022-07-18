export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string
    website: string
    company: { name: string, catchPhrase: string, bs: string }
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: { lat: number, lng: number }
    }
}

export interface UsersTodos { users: User[], todos: Todo[] }