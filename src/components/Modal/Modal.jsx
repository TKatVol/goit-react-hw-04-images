import { createPortal } from 'react-dom';
import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "../Modal/Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {

    const closeOnEscapeKey = useCallback(event => {
        if (event.code === "Escape") {
            onClose();
        };
    }, [onClose]);

    const closeOnBackdropClick = useCallback(event => {
        if (event.currentTarget === event.target) {
           onClose();
        };
    }, [onClose]);

    useEffect(() => {
        window.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            window.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [closeOnEscapeKey]);

    return createPortal(
        <div className={styles.overlay} onClick = {closeOnBackdropClick}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>,
        modalRoot,
    );
};

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element,
};