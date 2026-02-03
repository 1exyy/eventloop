import styles from './styles.module.css';
import type {FC} from 'react';
import {clsx} from "clsx";
import React from "react";

type CallVariant = 'microtask' | 'macrotask' | 'callstack'

interface CallItemProps {
    variant: CallVariant;
    name: string
}

export const CallItem: FC<CallItemProps> = React.memo(({variant, name}) => {
    return (
        <div className={clsx(styles[variant], styles.item)}>
            {name}
        </div>
    );
});