import React from 'react'
import {Component} from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {ThreeDots} from 'react-loader-spinner'
import './index.css'
import TodoElement from '../TodoElement'



 const Logout = (props) => {
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove("todo_token")
        navigate("/login")
    }
  return (
    <button className='logout-btn' onClick={onLogout} type='button'>Logout</button>
  )
}


class TodoList extends Component{
    state = {newTodo: '', todoList: [], isLoading: true}

    componentDidMount(){
        this.getData()
    }


    getData = async () => {
        this.setState({isLoading:true})
        const token = Cookies.get("todo_token")
        const url = "https://todo-backend-1-o8t5.onrender.com/"
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok){
            this.setState({todoList: data})
        }else{
            response.send('Invalid data')
        }
        this.setState({isLoading:false})
    }

    onAddTodo = async () =>{
        const token = Cookies.get("todo_token")
        const {newTodo} = this.state
        if (newTodo !== ''){
            const userDetails = {
                id: uuidv4(),
                item: newTodo,
                status: "Undone"
            }
            const url = "https://todo-backend-1-o8t5.onrender.com/"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userDetails)
            }
            const response = await fetch(url,options)
            if(response.ok){
                this.setState({newTodo: ''},this.getData)
            }
        }
    }

    onStatusChange = async (id,isChecked) => {
        const token = Cookies.get("todo_token")
        const userDetails = {
            id,
            status: isChecked? "Done" : "Undone"
        }
        const url = "https://todo-backend-1-o8t5.onrender.com/"
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        if(response.ok){
            this.getData()
        }
    
    }

    onDeleteTodo = async (id) => {
        const token = Cookies.get("todo_token")
        const url = `https://todo-backend-1-o8t5.onrender.com/${id}`
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url,options)
        if (response.ok){
            this.getData()
        }
    }

    renderList = () => {
        const {todoList} = this.state
        return (<>
            { todoList.length > 0 ? (<ul className='list-cont'>
                {todoList.map(each => <TodoElement items={each} key={each.id} onStatusChange={this.onStatusChange} onDeleteTodo={this.onDeleteTodo} />)}
            </ul>) : (<div className="no-element">
                <p>No Pending Tasks</p>
                <h3>Add task to pin here </h3></div>) }</>
        )
    }

    render(){
        const {newTodo, isLoading} = this.state
        const cookie = Cookies.get("todo_token")
        if(cookie === undefined){
            return <Navigate to="/login" replace />
        }
        return (
            <div className='todo-bg'>
                <div className='todo-cont-bg'>
                    <h1 className='todo-main-head'>Todos</h1>
                    <div className='sub-cont'>
                    <h2 className='todo-head'>Create <span className='todo-head-span'>Task</span></h2>
                    {<Logout />}
                    </div>
                    <input className='input-element'
                    onChange={event => this.setState({newTodo: event.target.value})}
                    type='text'
                    placeholder='What needs to be done?'
                    value={newTodo} /><br/>
                    <button className='add-btn' onClick={this.onAddTodo} type='button'>Add</button>
                    <br/>
                    <h2 className='todo-head'> My <span className='todo-head-span'>Tasks</span></h2>
                    {!isLoading? this.renderList() : <div className='center'><ThreeDots color="#4fa94d" height="100" width="100" /></div>}
                </div>
            </div>
        )
}
}
export default TodoList