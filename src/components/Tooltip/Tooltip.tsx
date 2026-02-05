import styles from './styles.module.css';
import type {FC, ReactNode} from 'react';
import {useState, useRef, useEffect} from 'react';
import {clsx} from "clsx";

interface TooltipProps {
    children: ReactNode;
    text: string;
}

export const Tooltip: FC<TooltipProps> = ({
                                              children,
                                              text,
                                          }) => {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (show && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let calculatedPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

            const space = {
                top: triggerRect.top,
                bottom: viewportHeight - triggerRect.bottom,
                left: triggerRect.left,
                right: viewportWidth - triggerRect.right,
            };

            if (tooltipRect.width <= space.right && tooltipRect.height <= space.bottom) {
                calculatedPosition = 'right';
            } else if (tooltipRect.width <= space.left && tooltipRect.height <= space.bottom) {
                calculatedPosition = 'left';
            } else if (tooltipRect.height <= space.top && tooltipRect.width <= Math.max(space.left, space.right)) {
                calculatedPosition = 'top';
            } else if (tooltipRect.height <= space.bottom && tooltipRect.width <= Math.max(space.left, space.right)) {
                calculatedPosition = 'bottom';
            }

            setPosition(calculatedPosition);
        }
    }, [show]);

    return (
        <div
            className={styles.tooltip}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <div ref={triggerRef} className={styles.trigger}>
                {children}
            </div>
            {show && (
                <div
                    ref={tooltipRef}
                    className={clsx(styles.tooltipContent, styles[position])}
                >
                    {text}
                </div>
            )}
        </div>
    );
};