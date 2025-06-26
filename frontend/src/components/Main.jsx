import React from 'react'
import  '../assets/css/style.css'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'

const Main = () => {
  return (
    <>
      <div className='container '>
        <div className="p-5 text-center bg-color rounded ">
            <h1 className='text-light'> Stock Prediction Portal</h1>
            <p className="text-light lead">This stock prediction application utilizes machine learning techniques, specifically employing Keras, and LSTM model, integrated within the Django framework. It forecasts future stock prices by analyzing 100-day and 200-day moving averages, essential indicators widely used by stock analysts to inform trading and investment decisions.</p>
            <Button text='login' class='btn-outline-info' url='login'/>
        </div>
      </div>
    </>
  )
}

export default Main
