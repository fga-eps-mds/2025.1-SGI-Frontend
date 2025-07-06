'use client';

import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';


interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link href="/">
          <div className={styles.logoContainer}>
            {/* Image é recomendado pelo next no lugar do img */}
            <Image
              src="/gitfica_icon.png"
              alt="GitFica Logo"
              width={100}
              height={100}
              className={styles.logoIcon}
            />
            <span>GitFica</span>
          </div>
        </Link>

        <nav className={styles.navBar}>
          <ul>
            <li className={styles.navLinks}><Link href="/home">Métricas</Link></li>
            <li className={styles.navLinks}><Link href="/missions">Missões</Link></li>
            <li className={styles.navLinks}><Link href="#">Equipes</Link></li>
          </ul>
        </nav>
      </div>

      <div className={styles.rightContainer}>
        <span className={`material-symbols-outlined ${styles.icone}`}>notifications</span>

        {/* Se não estiver logado, mostra "Entrar"; caso contrário, mostra link de Perfil ou Log out */}
        {!isLoggedIn ? (
          <Link href="/login" className={styles.enterButton}>
            Entrar
          </Link>
        ) : (
          <>
            <Link href="/profile" className={styles.profileContainer}>
              <span className="material-symbols-outlined">account_circle</span>
              <span className={styles.profileText}>Meu Perfil</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
