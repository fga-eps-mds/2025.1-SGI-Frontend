'use client'
import styles from './profile.module.css'

export default function ProfilePage() {
  return (
<>

    <main className={styles.container}>
      {/* Foto e dados agrupados para controlar o gap */}
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
        <button className={styles.logout}>Logout</button>
        <button className={styles.delete}>Apagar minha conta</button>
      </div>


    </main>

</>
  )

}
