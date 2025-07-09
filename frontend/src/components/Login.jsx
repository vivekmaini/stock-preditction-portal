import { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../AuthProvider";
import AuthProvider from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../axiosinstance";
const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error,seterror]=useState('')
  const {isloggedIn,setisloggedIn}=useContext(AuthContext)
  const navigate=useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const userdata = {
      username,
      password,
    };

    try {
      const response = await axiosinstance.post('http://127.0.0.1:8000/api/v1/token/',userdata
      );
      localStorage.setItem('accessToken',response.data.access)
      localStorage.setItem("refreshToken",response.data.refresh)
      seterror('')
      console.log("Login  succesfully")
      setisloggedIn(true)
      navigate('/dashboard')
     
    } catch (error) {
      seterror("invalid credentials");
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-6 bg-color  p-5 ">
            <h3 className="text-center text-light mb-4">Login to our Portal</h3>
            <form onSubmit={handlelogin}>
              
                <div className='mb-4'>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control "
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
               {error && <div className="text-danger">{error}</div>}
                 {loading ?(<button type='submit' className='btn btn-info d-block mx-auto'> <FontAwesomeIcon icon={faSpinner} spin/>Please Wait</button>):
                              ( <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>)}
                               
  
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
