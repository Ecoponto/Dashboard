import React from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Carregando...' }) => {
  return (
    <div className='overlay'>
      <div className='loaderContainer'>
        <div className='spinner'></div>
        <p className='loadingText'>{message}</p>
      </div>
    </div>
  );
};