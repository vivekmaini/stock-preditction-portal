import Button from "./Button"

const Header = () => {
  return (
    <>
     <nav className="navbar container pt-4 pb-4 align-items-start">
        <a className=" navbar-brand text-light"href="">Stock Prediction Portal</a>
       <div>
        <Button text="login" class='btn-outline-info'/>
        &nbsp; &nbsp;
        <Button text="Register" class='btn btn-info'/>
       </div>
     </nav>
    </>
  )
}

export default Header
