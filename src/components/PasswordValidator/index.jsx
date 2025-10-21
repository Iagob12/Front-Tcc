import React from 'react';
import './style.css';

const PasswordValidator = ({ password, show }) => {
    if (!show) return null;

    // Caracteres especiais aceitos pelo back-end (sem o #)
    const specialCharsRegex = /[!@$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?]/;
    
    const validations = [
        {
            test: password.length >= 8,
            message: '8+ caracteres'
        },
        {
            test: /[A-Z]/.test(password),
            message: 'Maiúscula (A-Z)'
        },
        {
            test: /[a-z]/.test(password),
            message: 'Minúscula (a-z)'
        },
        {
            test: /[0-9]/.test(password),
            message: 'Número (0-9)'
        },
        {
            test: specialCharsRegex.test(password),
            message: 'Especial (!@$%&*...)'
        }
    ];

    const allValid = validations.every(v => v.test);

    return (
        <div className="password-validator">
            <p className="validator-title">Requisitos da senha:</p>
            <div className="validator-grid">
                {validations.map((validation, index) => (
                    <div 
                        key={index} 
                        className={`validator-item ${validation.test ? 'valid' : 'invalid'}`}
                    >
                        <span className="validator-icon">
                            {validation.test ? '✓' : '○'}
                        </span>
                        <span className="validator-text">{validation.message}</span>
                    </div>
                ))}
            </div>
            <p className="validator-note">
                <strong>Caracteres especiais:</strong> <code>! @ $ % & * _ - + =</code>
            </p>
            {allValid && (
                <p className="validator-success">✓ Senha forte!</p>
            )}
        </div>
    );
};

export default PasswordValidator;
