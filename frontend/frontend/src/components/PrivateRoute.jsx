import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {isloggedIn}= useContext(AuthContext)
    return isloggedIn ?
    (children): 
    (
    <Navigate to='/login'/>
  )
}

export default PrivateRoute
