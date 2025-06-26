import {useState,useContext,createContext} from 'react'
const AuthContext=createContext();
const AuthProvider = ({children}) => {
    const [isloggedIn,setisloggedIn]=useState(
        !!localStorage.getItem('acccessToken')
    )
  return (
    
     <AuthContext.Provider value={{isloggedIn,setisloggedIn}}>
        {children}
     </AuthContext.Provider>
   
  )
}

export default AuthProvider
export {AuthContext}
