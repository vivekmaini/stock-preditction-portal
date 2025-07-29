import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"
import { AuthContext } from "../AuthProvider"
import { useContext } from "react"


 const Header = () => {
 const {isloggedIn,setisloggedIn}=useContext(AuthContext);
 const navigate=useNavigate();
 const handlelogout=()=>{
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  setisloggedIn(false)
  navigate('/login')
 }
  return (
    <>
     <nav className="navbar container pt-4 pb-4 align-items-start">
        <Link className=" navbar-brand text-light" to="/">Stock Prediction Portal</Link>
       <div>
        {isloggedIn ?(<>
          <Button text='Dashboard' class='btn-info space' url='/dashboard'></Button>
          &nbsp;
          <button className="btn btn-danger" onClick={handlelogout}>Logout</button>
        </>
         
        ):
        (
        <>
        <Button text="login" class='btn-outline-info' url='/login'/>
        &nbsp; &nbsp;
        <Button text="Register" class='btn btn-info' url='/register'/>
        </>
        )}
       </div>
     </nav>
    </>
  )
}

export default Header
