import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'
import { Navigate } from 'react-router-dom'

const Publicroute = ({children}) => {
    const {isloggedIn}=useContext(AuthContext)
  return (
        !isloggedIn ? (children):(<>
        <Navigate to='/dashboard'/></>)
      
  )
}

export default Publicroute
