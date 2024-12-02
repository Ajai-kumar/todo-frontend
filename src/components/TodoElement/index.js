import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import './index.css'

const TodoElement = ({items,onDeleteTodo, onStatusChange}) => {
  const {id,item,status} = items 
  const todoStyle = status === "Done" ? 'strike' : ''
  const isChecked = status === "Done"

  const onDelete = () => {
    onDeleteTodo(id)
  }

  const onChecked = (event) =>{
    console.log(event.target.checked)
    onStatusChange(id,event.target.checked)
  }

  return (
    <li className='list-element'>
        <input className='checkbox' 
        type='checkbox' 
        checked= {isChecked}
        onClick={onChecked}/>
        <div className='todo-cont'>
            <p className={`todo ${todoStyle}`}>{item}</p>
            <button type='button' className='del-btn' onClick={onDelete}>
            <MdDeleteOutline className='del' />
            </button>
        </div>
    </li>
  )
}

export default TodoElement