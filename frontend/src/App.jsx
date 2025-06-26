
import Main from './components/Main'
import './App.css'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import AuthProvider from './AuthProvider'

function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Header/>
    <Routes>
     <Route path='/' element={<Main/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
