import { useState } from "react"
import { NextPage } from "next"
import { Todo } from "../components/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faToggleOn, faToggleOff, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import type { Dispatch, SetStateAction } from 'react'


const ItemComponent:
  NextPage<{
    isEditing: boolean,
    setTitle: Dispatch<SetStateAction<string>>,
    itemTitle: string
    setEditing: Dispatch<SetStateAction<boolean>>,

  }> = ({ isEditing, setTitle, itemTitle, setEditing }) => {

    const [innerTitle, setInnerTitle] = useState(itemTitle)

    const handleClick = () => {
      setTitle(innerTitle)
      setEditing(!isEditing)
    }

    const toggleIcon = (
      <button onClick={handleClick}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={`w-6 h-6 inline ml-2 mr-2 text-${isEditing ? 'blue' : 'grey'}-900`}
        />
      </button>
    )

    if (isEditing) return (
      <>
        {toggleIcon}
        <input
          className="text-lg text-gray-800 placeholder-gray-800 border rounded-lg focus:shadow-outline"
          type="text"
          value={innerTitle}
          onChange={t => setInnerTitle(t.target.value)}
          onClick={() => {
            if (itemTitle == innerTitle) return
            handleClick()
          }}
        />
      </>
    )

    return (
      <>
        {toggleIcon}
        <span onClick={handleClick} className="capitalize">{itemTitle}</span>
      </>
    )
  }


const TodoCard:
  NextPage<{
    todo: Todo,
    setCompleted: Function
  }> = ({ todo, setCompleted }) => {
    const completedClass = todo.completed ? 'border-green-700' : 'border-red-800'
    const toggleIcon = todo.completed ? faToggleOn : faToggleOff
    const [isEditing, setEditing] = useState(false)
    const [title, setTitle] = useState(todo.title)

    return (
      <div className={`${completedClass} card border-solid border-b-4`}>
        <div className="">
          <button onClick={() => setCompleted(todo.id)}>
            <FontAwesomeIcon icon={toggleIcon} className='w-7 h-7 inline' />
          </button>
          <ItemComponent
            isEditing={isEditing}
            setTitle={setTitle}
            itemTitle={title}
            setEditing={setEditing}
          />
        </div>
      </div>
    )

  }

export default TodoCard