import styles from './styles.module.css';
import type {FC, PropsWithChildren} from 'react';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export type CustomModalProps = Pick<ModalProps, 'onClose' | 'isOpen'>;

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
                                                             isOpen,
                                                             onClose,
                                                             title,
                                                             children,
                                                             size = 'md',
                                                             showCloseButton = true
                                                         }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);

            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!mounted || (!isOpen && !isVisible)) {
        return null;
    }

    return createPortal(
        <div
            className={clsx(
                styles.modalOverlay,
                { [styles.visible]: isVisible, [styles.hidden]: !isVisible }
            )}
            onClick={handleOverlayClick}
        >
            <div
                className={clsx(
                    styles.modalContent,
                    styles[size],
                    { [styles.visible]: isVisible, [styles.hidden]: !isVisible }
                )}
            >
                {(title || showCloseButton) && (
                    <div className={styles.modalHeader}>
                        {title && <h2 className={styles.modalTitle}>{title}</h2>}
                        {showCloseButton && (
                            <button
                                className={styles.closeButton}
                                onClick={handleClose}
                                aria-label="Закрыть модальное окно"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                )}

                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};