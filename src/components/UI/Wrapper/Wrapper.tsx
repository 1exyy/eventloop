import styles from './styles.module.css';
import type {ComponentPropsWithoutRef, FC} from 'react';
import {clsx} from "clsx";
import {MdInfo} from "react-icons/md";
import {Tooltip} from "../../Tooltip/Tooltip.tsx";

interface WrapperProps extends ComponentPropsWithoutRef<'div'> {
    title: string;
    description: string;
}

export const Wrapper: FC<WrapperProps> = ({children, title, className, description, ...props}) => {
    return (
        <div className={clsx(styles.wrapper, className)} {...props}>
            <span className={styles.title}>
                <span>{title}</span>
                <Tooltip text={description}>
                <MdInfo size={20}/>
                    </Tooltip>
            </span>
            <div className={styles.body}>{children}</div>
        </div>
    );
};