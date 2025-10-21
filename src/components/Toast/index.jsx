import React, { useEffect } from 'react';
import './style.css';

const Toast = ({ message, type = 'info', duration = 5000, onClose }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
            default:
                return 'ℹ';
        }
    };

    return (
        <div className={`toast toast-${type}`} role="alert" aria-live="polite">
            <div className="toast-icon">{getIcon()}</div>
            <div className="toast-content">
                <p className="toast-message">{message}</p>
            </div>
            <button 
                className="toast-close" 
                onClick={onClose}
                aria-label="Fechar notificação"
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;
