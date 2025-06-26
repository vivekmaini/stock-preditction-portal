import React, { useState } from 'react'
import  '../assets/css/style.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username,setUsername]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const [errors,seterror]=useState({})
  const [success,setsuccess]=useState(false)
  const [loading,setloading]=useState(true)

  const handlesubmit= async(e)=>{
     e.preventDefault();
     setloading(true)
      const userdata={
        username,email,password
      };
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userdata)
      
      console.log("Userdata==>",userdata)
      console.log("Registration successfully");
      seterror({})
      setsuccess(true)
    }
    catch(error){
      seterror(error.response.data)
     console.log("Registeration error", error.response?.data || error.message)
    } finally{
      setloading(false)
    }
    
    
  }

  return (
    <>
      <div className='container'>
      <div className='row justify-content-center '>
        <div className='col-md-6 bg-color  p-5  rounded-a'>
           <h3 className='text-center text-light mb-4'>Create an Account</h3>
          <form onSubmit={handlesubmit}>
             <div className='mb-4'>
                <input type="text" className='form-control ' placeholder='Enter Username' onChange={(e)=>setUsername(e.target.value)} value={username}/>
                <p>{errors.username && <div className='text-danger'>{errors.username}</div>}</p>
             </div>
             <div className='mb-4'>
                <input type="email" className='form-control mb-4' placeholder='Enter Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
                <p>{errors.email && <div className='text-danger'>{errors.email}</div>}</p>
             </div>
             <div className='mb-3'>
                <input type="password" className='form-control ' placeholder='Set Password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <p>{errors.password && <div className='text-danger'>{errors.password}</div>}</p>
             </div>
             {success && <div class='alert alert-success'>Registration Successful</div>}
              {loading ?(<button type='submit' className='btn btn-info d-block mx-auto'> <FontAwesomeIcon icon={faSpinner} spin/>Please Wait</button>):
              ( <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>)}
               
          </form>
        </div>

      </div>
       </div>
    </>
  )
}

export default Register
