import styles from './styles.module.css';
import type {FC, InputHTMLAttributes} from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

export const Input: FC<InputProps> = ({
                                          label,
                                          error,
                                          size = 'medium',
                                          fullWidth = false,
                                          className = '',
                                          ...props
                                      }) => {
    const inputClassNames = [
        styles.input,
        styles[`input--${size}`],
        error ? styles['input--error'] : '',
        fullWidth ? styles['input--fullWidth'] : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.inputWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                {...props}
                className={inputClassNames}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};