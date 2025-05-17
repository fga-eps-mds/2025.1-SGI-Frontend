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
          {/* Primeira seção com retângulos */}
          <main> {/* tag semântica para o conteúdo principal */}
            <div className={styles.retanguloTopo}></div> {/* aplicar a classe importada */}
            <div className={styles.retanguloEntrar}>
              Entrar
            </div> {/* = division: /agrupa elementos e aplica estilo de css a eles*/}
          </main>
    
          {/* Segunda seção com icone do GitFica*/}
          <div className={styles.logoContainer}>
            <img src="gitfica_icon.png" alt= "GitFica Logo" className={styles.logoIcon} />
            <span>GitFica</span>
            </div>
</>
  )

}
