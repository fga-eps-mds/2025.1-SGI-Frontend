'use client';

import { useState } from 'react';
import Modal from '../../components/Modal/page';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const DeleteAccount = () => {
    console.log('Conta apagada!');
    setModalOpen(false);
  };

  const Logout = () => {
    console.log('Você saiu.');
  }

  return (
    <>
      <main className={styles.container}>

        <div className={styles.userInfo}>
          <img
            src="/sample_profile.png"
            alt="Foto de Perfil"
            className={styles.profileImage}
          />
          <span className={styles.name}>Nome do Usuário</span>
          <span className={styles.username}>@usuario</span>
          <span className={styles.email}>emailusuario@usuario.com</span>
          <p className={styles.bio}>
            Biografia: Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.logout} onClick={Logout }>Logout</button> {/* No momento as funções confirmam pelo console, corrigir. */}
          <button className={styles.delete} onClick={() => setModalOpen(true)}>
            Apagar minha conta
          </button>
        </div>
      </main>

      {/* Modal q confirma Apagar conta*/}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={DeleteAccount}
        title="Apagar conta?"
        message="Deseja realmente apagar sua conta? Essa ação não poderá ser desfeita."
        confirmText="Apagar"
        cancelText="Cancelar"
      />
    </>
  );
}
