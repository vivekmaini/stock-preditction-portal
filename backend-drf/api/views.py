from django.shortcuts import render
from .serializer import StockPrediction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import yfinance as yf
from datetime import datetime
import os
from django.conf import settings
from .utilies import save_img
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error,r2_score

class StockPredictionApiview(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer=StockPrediction(data=request.data)
        if serializer.is_valid():
            ticker=serializer.validated_data['ticker']
            now=datetime.now()
            start=datetime(now.year-10,now.month,now.day)
            end=now
            df=yf.download(ticker,start,end)
            print(df)
            if df.empty:
                return Response({'error':'no data found','status':status.HTTP_404_NOT_FOUND})
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='closing Price')
            plt.title(f'Closing price of {ticker}')
            plt.xlabel('days')
            plt.ylabel('Prices')
            plt.legend()
            #Save The Plot to a File
            plot_img_path=f'{ticker}_plot.png'
            img_path=save_img(plot_img_path)
            
            # 100 days plot
            m100=df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,6))
            plt.plot(df.Close,label='closing Price')
            plt.plot(m100,'r',label='100 Dma')
            plt.title(f'Moving Average of 100 Days {ticker}')
            plt.xlabel('days')
            plt.ylabel('Prices')
            plt.legend()

            plot_img_path=f'{ticker}100_dma_plot.png'
            plot_100_img=save_img(plot_img_path)

            #200 Days DMA 

            m200=df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='closing Price')
            plt.plot(m100,'r',label='100 Dma')
            plt.plot(m200,'g',label='200 Dma')
            plt.title(f'Moving Average of 200 Days {ticker}')
            plt.xlabel('days')
            plt.ylabel('Prices')
            plt.legend()

            plot_img_path=f'{ticker}200_dma_plot.png'
            plot_200_img=save_img(plot_img_path)

            # Splitting data into Training & Testing datasets
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

            # Scaling down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))

            # Load ML Model
            model = load_model('/Users/vivekmaini/Desktop/stock-prediction/Resources/stock_prediction_portal.keras')

            # Preparing Test Data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)



            x_test = []
            y_test = []
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i, 0])
            x_test, y_test = np.array(x_test), np.array(y_test)

            # Making Predictions
            y_predicted = model.predict(x_test)

            # Revert the scaled prices to original price
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            # Plot the final prediction
             # Plot the final prediction
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(y_test, 'b', label='Original Price')
            plt.plot(y_predicted, 'r', label='Predicted Price')
            plt.title(f'Final Prediction for {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_final_prediction.png'
            plot_prediction = save_img(plot_img_path)

            # Model Evaluation
            # Mean Squared Error (MSE)
            mse = mean_squared_error(y_test, y_predicted)

            # Root Mean Squared Error (RMSE)
            rmse = np.sqrt(mse)

            # R-Squared
            r2 = r2_score(y_test, y_predicted)

            

            return Response({'Status':'success', 'ticker': ticker,'plot':img_path ,'plot_100_img':plot_100_img,'plot_200_img':plot_200_img,'plot_prediction': plot_prediction,
                'mse': mse,
                'rmse': rmse,
                'r2': r2})
    

# Create your views here.
