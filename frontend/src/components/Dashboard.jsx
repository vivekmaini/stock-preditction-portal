import React, { useEffect } from 'react'
import axios from 'axios'
import axiosinstance from '../axiosinstance'

const Dashboard = () => {
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
  return (
   
  <><h1 className='text-light'>heloo</h1></>
  )
}

export default Dashboard
