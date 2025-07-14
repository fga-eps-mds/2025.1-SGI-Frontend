import styles from './header.module.css';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push('/profile');
    } else {
      router.push('/');
    }
  };

  return (
    <header>
      <div className={styles.retanguloTopo}></div>
      <div 
        className={styles.retanguloEntrar}
        onClick={handleProfileClick}
        style={{ cursor: 'pointer' }}
      >
        {isLoading ? 
          'Carregando...' : 
          isAuthenticated ? 
            `Olá, ${user?.username || 'Usuário'}` : 
            'Entrar'
        }
      </div>
      <div className={styles.logoContainer} onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
        <Image
          src="/gitfica_icon.png"
          alt="GitFica Logo"
          width={100}
          height={100}
          className={styles.logoIcon}
        />
        <span>GitFica</span>
      </div>
    </header>
  );
}
