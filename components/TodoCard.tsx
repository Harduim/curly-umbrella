import { NextPage } from "next"
import { useState, useContext } from "react"
import type { Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faToggleOn, faToggleOff, faPenToSquare, faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons"

import { Todo } from "./interfaces"
import GlobalContext from "../context/global"


const ItemComponent:
  NextPage<{
    isEditing: boolean,
    setTitle: Dispatch<SetStateAction<string>>,
    itemTitle: string
    setEditing: Dispatch<SetStateAction<boolean>>,

  }> = ({ isEditing, setTitle, itemTitle, setEditing }) => {

    const [innerTitle, setInnerTitle] = useState(itemTitle)
    const [justDeleted, setJustDeleted] = useState(false)

    const handleClick = () => {
      setTitle(innerTitle)
      setEditing(!isEditing)
    }

    const toggleIcon = (
      <button title="Edit TODO" onClick={handleClick}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={`w-6 h-6 inline ml-2 mr-2 text-${isEditing ? 'blue' : 'grey'}-900`}
        />
      </button>
    )

    if (isEditing) return (
      <>
        <div className="block">
          <textarea
            className="text-lg text-gray-800 placeholder-gray-800 border rounded-lg focus:shadow-outline w-full"
            // type="textarea"
            value={innerTitle}
            onChange={t => {
              setInnerTitle(t.target.value)
              setJustDeleted(false)
            }}
            onClick={() => {
              if (itemTitle == innerTitle) return
              if (justDeleted) return
              handleClick()
            }}
          />
        </div>
        <button title="Clear Text" onClick={() => {
          setInnerTitle('')
          setJustDeleted(true)
        }}>
          <FontAwesomeIcon icon={faDeleteLeft} className='w-7 h-7 ml-1 mr-1 hidden md:inline' />
        </button>
        {toggleIcon}
      </>
    )

    return (
      <>
        <span onClick={handleClick} className="capitalize block">{itemTitle}</span>
        {toggleIcon}
      </>
    )
  }


const TodoCard:
  NextPage<{ todo: Todo }> = ({ todo }) => {
    const completedClass = todo.completed ? 'border-green-700' : 'border-red-800'
    const toggleIcon = todo.completed ? faToggleOn : faToggleOff
    const [isEditing, setEditing] = useState(false)
    const [title, setTitle] = useState(todo.title)
    const { handleCompleteTodo, handleDeleteTodo } = useContext(GlobalContext)

    if (!handleCompleteTodo || !handleDeleteTodo) return null

    return (
      <div className={`${completedClass} card border-solid border-b-4`}>
        <div className="">
          <ItemComponent
            isEditing={isEditing}
            setTitle={setTitle}
            itemTitle={title}
            setEditing={setEditing}
          />
          <button title="Toggle TODO completion" onClick={() => handleCompleteTodo(todo.id)}>
            <FontAwesomeIcon icon={toggleIcon} className='w-7 h-7 inline ml-1 mr-1' />
          </button>
          <button onClick={() => handleDeleteTodo(todo.id)}>
            <FontAwesomeIcon title="Delete TODO" icon={faTrash} className='w-5 h-5 inline ml-1 mr-1' />
          </button>
        </div>
      </div>
    )
  }

export default TodoCard