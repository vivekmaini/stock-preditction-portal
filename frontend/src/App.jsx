
import Main from './components/Main'
import './App.css'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import AuthProvider from './AuthProvider'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/Privateroute'
import Publicroute from './components/Publicroute'

function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Header/>
    <Routes>
     <Route path='/' element={<Main/>}/>
     <Route path='/register' element={<Publicroute><Register/></Publicroute>
     }/>
     <Route path='/login' element={<Publicroute><Login/></Publicroute>}></Route>
     <Route path='/dashboard' element={<PrivateRoute>< Dashboard/></PrivateRoute>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
