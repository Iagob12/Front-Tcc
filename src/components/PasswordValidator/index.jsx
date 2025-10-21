import React from 'react';
import './style.css';

const PasswordValidator = ({ password, show }) => {
    if (!show) return null;

    const validations = [
        {
            test: password.length >= 8,
            message: 'Mínimo de 8 caracteres'
        },
        {
            test: /[A-Z]/.test(password),
            message: 'Pelo menos uma letra maiúscula'
        },
        {
            test: /[a-z]/.test(password),
            message: 'Pelo menos uma letra minúscula'
        },
        {
            test: /[0-9]/.test(password),
            message: 'Pelo menos um número'
        },
        {
            test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            message: 'Pelo menos um caractere especial (!@#$%...)'
        }
    ];

    const allValid = validations.every(v => v.test);

    return (
        <div className="password-validator">
            <p className="validator-title">Sua senha deve conter:</p>
            <ul className="validator-list">
                {validations.map((validation, index) => (
                    <li 
                        key={index} 
                        className={`validator-item ${validation.test ? 'valid' : 'invalid'}`}
                    >
                        <span className="validator-icon">
                            {validation.test ? '✓' : '○'}
                        </span>
                        <span className="validator-text">{validation.message}</span>
                    </li>
                ))}
            </ul>
            {allValid && (
                <p className="validator-success">✓ Senha forte!</p>
            )}
        </div>
    );
};

export default PasswordValidator;
