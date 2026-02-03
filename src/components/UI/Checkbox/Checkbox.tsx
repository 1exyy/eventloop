import styles from './styles.module.css';
import type {FC} from 'react';

interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    id?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
                                                checked = false,
                                                onChange,
                                                label,
                                                disabled = false,
                                                id
                                            }) => {
    const handleChange = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <label className={`${styles.checkboxContainer} ${disabled ? styles.disabled : ''}`} htmlFor={id}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>
            {label && <span className={styles.checkboxLabel}>{label}</span>}
        </label>
    );
};