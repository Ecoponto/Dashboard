import React from 'react';
import './ErrorBox.css';

interface ErrorBoxProps {
  message: string;
  onClose?: () => void; // A função para fechar é opcional
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ message, onClose }) => {
  if (!message) {
    return null; // Não renderiza nada se não houver mensagem
  }

  return (
    <div className="errorBox">
      <div className="errorIcon">!</div>
      <p className="errorMessage">{message}</p>
      {onClose && (
        <button className="closeButton" onClick={onClose} aria-label="Fechar">
          &times;
        </button>
      )}
    </div>
  );
};