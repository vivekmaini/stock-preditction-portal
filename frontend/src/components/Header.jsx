import { Link } from "react-router-dom"
import Button from "./Button"

const Header = () => {
  return (
    <>
     <nav className="navbar container pt-4 pb-4 align-items-start">
        <Link className=" navbar-brand text-light" to="/">Stock Prediction Portal</Link>
       <div>
        <Button text="login" class='btn-outline-info' url='/login'/>
        &nbsp; &nbsp;
        <Button text="Register" class='btn btn-info' url='/register'/>
       </div>
     </nav>
    </>
  )
}

export default Header
