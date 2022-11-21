import {useEffect} from "react";
import PropTypes from "prop-types";
import styles from "../Modal/Modal.module.css";

export const Modal = ({ onClose, children }) => {

    const closeOnEscapeKey = event => {
        if (event.code === "Escape") {
            onClose();
        };
    };

    const closeOnBackdropClick = event => {
        if (event.currentTarget === event.target) {
           onClose();
        };
    };

    useEffect(() => {
        window.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            window.removeEventListener("keydown", closeOnEscapeKey);
        };
    });

    return (
        <div className={styles.overlay} onClick = {closeOnBackdropClick}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element,
};