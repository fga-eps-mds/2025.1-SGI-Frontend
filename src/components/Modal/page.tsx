'use client';
import styles from './modal.module.css';


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <br></br>
        <p>{message}</p>
        <br></br>
        <div className={styles.buttons}>
          <button className={styles.buttonModal} onClick={onClose}>
            {cancelText}
          </button>
          <button className={`${styles.buttonModal} ${styles.danger}`} onClick={onConfirm}>
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}
