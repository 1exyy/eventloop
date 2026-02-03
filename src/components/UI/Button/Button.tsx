import styles from './styles.module.css';
import type {ComponentPropsWithoutRef, FC} from 'react';
import {clsx} from "clsx";


type ButtonVariants = 'base' | 'reset' | 'step' | 'run';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: ButtonVariants
}

export const Button: FC<ButtonProps> = ({children, className, variant = 'base', ...props}) => {
    return (
        <button className={clsx(styles.button, className, styles[variant])} {...props}>
            {children}
        </button>
    );
};