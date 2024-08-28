
import { Router , Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Main from './components/Main'



function App() {


  return (
    <>
    <Routes>
      <Route exact path='/' element={<Main/>}>
      {/* <Route path='/hadi' element={<Login/>}/> */}
      </Route>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
