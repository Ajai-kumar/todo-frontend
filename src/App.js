//import logo from './logo.svg';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Todo from './components/TodoList'

function App() {
  return (
    <Routes>
      <Route exact path='/login' Component={Login} />
      <Route exact path='/register' Component={Register} />
      <Route exact path='/' Component={Todo} />
    </Routes>
  );
}

export default App;
