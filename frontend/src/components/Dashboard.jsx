import React, { useEffect, useState } from 'react'
import axios from 'axios'
import axiosinstance from '../axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const Dashboard = () => {
  const [ticker,setticker]=useState('')
  const[error,seterror]=useState('')
  const [loading, setloading] = useState(false);
  const[plot,setplot]=useState()
  const[m100,setm100]=useState()
  const[m200,setm200]=useState()
  const [prediction, setPrediction] = useState()
  const [mse, setMSE] = useState()
  const [rmse, setRMSE] = useState()
  const [r2, setR2] = useState()

  
  useEffect(()=>{
    const fetchprotecteddata= async () =>{
      try{
        const response=await axiosinstance.get('/protected-view/')
      }catch(error){
      console.log('error :',error)
      }
    }
    fetchprotecteddata()
  }, [])
  const handlesubmit = async(e)=>{
    e.preventDefault();
    setloading(true)
    try{
      const response= await axiosinstance.post('/predict/',{ticker:ticker})
     console.log(response.data)
     const backendRoot=import.meta.env.VITE_BACKEND_ROOT
     const ploturl=`${backendRoot}${response.data.plot}`
     const m100url=`${backendRoot}${response.data.plot_100_img}`
     const m200url=`${backendRoot}${response.data.plot_200_img}`
     const predictionUrl=`${backendRoot}${response.data.plot_prediction}`
     
     setplot(ploturl)
     setm100(m100url)
     setm200(m200url)
     setPrediction(predictionUrl)
     setMSE(response.data.mse)
     setRMSE(response.data.rmse)
     setR2(response.data.r2)

     //set plots
     if(response.data.error){
        seterror(response.data.error)
     }
    }
    catch(error){
      seterror(true)
      console.log('there was a error:',error)
    }finally{
      setloading(false)
    }
  }
  return (
    <>
   <div className="container">
    <div className="row">
      <div className="col-md-6 mx-auto">
        <form onSubmit={handlesubmit}>
        
         <input type="text" className='form-control' placeholder='Enter your ticker' onChange={(e)=>setticker(e.target.value) } required/>
         <small>{error && <div className='text-danger'>{error}</div>}</small>
         {loading ?<button type='submit' className='btn btn-info mt-3'> <FontAwesomeIcon icon={faSpinner}spin/>Please wait </button>
         :<button type='submit' className='btn btn-info mt-3'> See Your Prediction</button>}
        

        </form>
        
      </div>
        {/* Print prediction plots */}
            {prediction && (
                <div className="prediction mt-5">
                <div className="p-3">
                    {plot && (
                        <img src={plot} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="p-3">
                    {m100 && (
                        <img src={m100} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="p-3">
                    {m200 && (
                        <img src={m200} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="p-3">
                    {prediction && (
                        <img src={prediction} style={{ maxWidth: '100%' }} />
                    )}
                </div>

                <div className="text-light p-3">
                    <h4>Model Evalulation</h4>
                    <p>Mean Squared Error (MSE): {mse}</p>
                    <p>Root Mean Squared Error (RMSE): {rmse}</p>
                    <p>R-Squared: {r2}</p>
                </div>

            </div>
            )}
        </div>
        </div>
    </>
  )
}

export default Dashboard
