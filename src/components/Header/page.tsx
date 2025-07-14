'use client';

import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push('/profile');
    } else {
      router.push('/');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <Image
              src="/gitfica_icon.png"
              alt="GitFica Logo"
              width={80}
              height={80}
              className={styles.logoIcon}
            />
            <span>GitFica</span>
          </div>
        </Link>

        {isAuthenticated && (
          <nav className={styles.navBar}>
            <ul>
              <li className={styles.navLinks}><Link href="/metrics">Métricas</Link></li>
              {/* <li className={styles.navLinks}><Link href="/missions">Missões</Link></li> */}
              {/* <li className={styles.navLinks}><Link href="#">Equipes</Link></li> */}
            </ul>
          </nav>
        )}
      </div>

      <div className={styles.rightContainer}>
        {isAuthenticated && (
          <span className={`material-symbols-outlined ${styles.icone}`}>notifications</span>
        )}

        {!isAuthenticated ? (
          <div 
            className={styles.enterButton}
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </div>
        ) : (
          <div className={styles.profileContainer}>
            <div 
              onClick={handleProfileClick}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <span className="material-symbols-outlined">account_circle</span>
              <span className={styles.profileText}>
                {user?.username || 'Usuário'}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}