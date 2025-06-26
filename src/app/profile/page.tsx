import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../components/Modal/page';
import styles from './profile.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function ProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, isAuthenticated, isLoading, logout, deleteAccount } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      setModalOpen(false);
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      alert('Erro ao deletar a conta. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.container}>
        <p>Você precisa estar logado para ver esta página.</p>
      </div>
    );
  }

  return (
    <>
      <main className={styles.container}>
        <div className={styles.userInfo}>
          <img
            src={user.avatar_url || "/sample_profile.png"}
            alt="Foto de Perfil"
            className={styles.profileImage}
          />
          <span className={styles.name}>{user.name || user.username}</span>
          <span className={styles.username}>@{user.username}</span>
          <span className={styles.email}>{user.email}</span>
          <p className={styles.bio}>
            {user.bio || "Nenhuma biografia disponível."}
          </p>
          
          <div className={styles.githubStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.public_repos || 0}</span>
              <span className={styles.statLabel}>Repositórios</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.followers || 0}</span>
              <span className={styles.statLabel}>Seguidores</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.following || 0}</span>
              <span className={styles.statLabel}>Seguindo</span>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
          <button 
            className={styles.delete} 
            onClick={() => setModalOpen(true)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deletando...' : 'Apagar minha conta'}
          </button>
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Apagar conta?"
        message="Deseja realmente apagar sua conta? Essa ação não poderá ser desfeita."
        confirmText={isDeleting ? "Deletando..." : "Apagar"}
        cancelText="Cancelar"
      />
    </>
  );
}
